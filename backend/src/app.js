import express, { response } from 'express'
import jwt from 'jsonwebtoken'
import { createPool } from 'mariadb'
import multer from 'multer'
import path from 'path'

import bcrypt from 'bcrypt'
const saltRounds = 10

//import { events } from "/webdevadv-project/frontend/src/lib/data.js"


const ACCESS_TOKEN_SECRET = "oaipfgauighASHFjagh"
const pool = createPool({
  host: "db",
  port: 3306,
  user: "root",
  password: "abc123",
  database: "abc",
  connectionLimit: 20,
})



pool.on('error', function (error) {
  console.log("Error from pool", error)
})

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(function (request, response, next) {

  response.set("Access-Control-Allow-Origin", "*")
  response.set("Access-Control-Allow-Methods", "*")
  response.set("Access-Control-Allow-Headers", "*")
  response.set("Access-Control-Expose-Headers", "*")

  next()

})



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/create-event', upload.single('eventImage'), async function (request, response) {
  const eventTitle = request.body.eventTitle
  const eventDate = request.body.eventDate
  const eventSalesDate = request.body.eventSalesDate
  const eventTicketLimit = request.body.eventTicketLimit
  const eventDescription = request.body.eventDescription
  const eventOrganizer = request.body.eventOrganizer
  const eventImage = request.file.buffer.toString('base64')


  console.log('abc', eventImage)


  const connection = await pool.getConnection()
  try {
    await connection.query('INSERT INTO events (eventTitle, eventDate, eventSalesDate, eventTicketLimit, eventDescription, eventOrganizer, eventImage) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [eventTitle, eventDate, eventSalesDate, eventTicketLimit, eventDescription, eventOrganizer, eventImage]);
    response.status(200).json();
    console.log("Upload Succesfull")
  } catch (error) {
    console.log(error)
    response.status(500).send('Internal Server Error')
  } finally {
    connection.release()
  }

})



app.get("/events/:id", async function (request, response) {
  const eventID = request.params.id;
  console.log("Recieved GET/events", eventID)
  const connection = await pool.getConnection();
  try {

    const query = "SELECT * FROM events WHERE eventID = ?";
    const events = await connection.query(query, [eventID]);

    for (const event of events) {
      event.eventImage = event.eventImage.toString("utf8");
      event.eventTime = event.eventDate.toISOString().substring(11,16)
      event.eventDate = event.eventDate.toISOString().substring(0, 10)
    }

    response.status(200).json(events);
  } catch (error) {
    console.log(error);
    response.status(500).end();
  } finally {
    connection.release()
  }
});

app.get("/events/:id/comments", async function (request, response) {
  const eventID = request.params.id
  console.log("Received GET /events/", eventID, "/comments")

  const connection = await pool.getConnection()
  try{
    const query = "SELECT * FROM comments WHERE commentEventID = ?"
    const comments = await connection.query(query, [eventID])
    console.log("Sending 200")
    response.status(200).json(comments)
  } catch(error) {
    console.log("Sending 500")
    response.status(500).end();
  } finally {
    connection.release()
  }
})



app.get("/events", async function (request, response) {
  console.log("Hello?!")
  const connection = await pool.getConnection()

  try {

    const query = "SELECT * FROM events"

    const events = await connection.query(query)

    for (const event of events) {
      event.eventImage = event.eventImage.toString('utf8')
    }

    response.status(200).json(events)

  } catch (error) {
    console.log(error)
    response.status(500).end()
  } finally {
    connection.release()
  }
})

app.get("/", async function (request, response) {
  console.log("Received GET /")
  const connection = await pool.getConnection()
  try {

    const query = "SELECT * FROM events"

    const events = await connection.query(query)

    for (const event of events) {
      event.eventImage = event.eventImage.toString('utf8')
    }


    response.status(200).json(events)

  } catch (error) {
    console.log(error)
    response.status(500).end()
  } finally {
    connection.release()
  }
})

app.post("/tokens", async function (request, response) {
  console.log("Received POST /tokens")

  const grantType = request.body.grant_type
  const password = request.body.password
  const username = request.body.username


  if (grantType != "password") {
    console.log("Unsuported Grant Type")
    response.status(400).json({ error: "unsupported_grant_type " })
    return
  }
  const connection = await pool.getConnection()
  try {
    const query = 'SELECT * FROM accounts WHERE accountUsername = ?'
    const account = await connection.query(query, [username]);
    bcrypt.compare(password, account[0].accountHash).then(function (result) {
      console.log(result)
      if (result) {
        const payload = {
          isLoggedIn: true
        }
        console.log(payload[0])
        jwt.sign(payload, ACCESS_TOKEN_SECRET, function (err, token) {
          if (err) {
            console.log(err, "sending 500")
            response.status(500).end()
          } else {
            console.log("sending 200")
            response.status(200).json({
              access_token: token,
              type: "bearer"
            })
          }
        })
      } else {
        console.log("sending 400")
        response.status(400).json({ error: "invalid_grant" })
      }
    })

  } catch (error) {
    console.log(error, "Sending 500")
    response.status(500).end()
  } finally {
    console.log("Closing connection")
    connection.release()
  }
})

app.post("/createAccount", async function (request, response) {
  console.log("Received POST /createAccount")

  const account = request.body
  const connection = await pool.getConnection()
  try {
    const query = 'INSERT INTO accounts (accountUsername, accountHash) VALUES (? , ?)'
    console.log("Hashing:", account.password)
    const hashedPassword = await bcrypt.hash(account.password, saltRounds)
    connection.query(query, [account.username, hashedPassword])
    console.log(account.username + ' created')
    response.status(200).end()
  } catch (error) {
    console.log(error)
    response.status(500).end()
  } finally {
    connection.release()
  }
})

app.post("/events/:id/create-comment", async function (request, response){
  const eventID = request.params.id
  console.log("Received POST/events/", eventID, "/create-comment")

  const comment = request.body
  const connection = await pool.getConnection()
  try{
    const query = 'INSERT INTO comments (commentAuthor, commentBody, commentEventID) VALUES (?, ?, ?)'
    connection.query(query, [comment.commentAuthor, comment.commentBody, eventID])
    response.status(200).end()
  } catch(error){
    console.log(error)
    response.status(500).end()
  } finally {
    connection.release()
  }
})



app.listen(8080, () => {
  console.log('Server started on port 8080')
})




