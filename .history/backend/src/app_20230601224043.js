import express, { response } from 'express'
import jwt from 'jsonwebtoken'
import { createPool } from 'mariadb'
import multer from 'multer'
import path from 'path'

import bcrypt from 'bcrypt'
import { userInfo } from 'os'
import { request } from 'http'
const saltRounds = 10

//import { events } from "/webdevadv-project/frontend/src/lib/data.js"

//##########################
//#####GLOBAL VARIABLES#####
//##########################
const EVENT_TITLE_MIN_LENGTH = 5
const EVENT_TITLE_MAX_LENGTH = 50
const EVENT_DESCRIPTION_MIN_LENGTH = 15
const EVENT_DESCRIPTION_MAX_LENGTH = 250


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
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    
    cb(new Error('Only .jpeg, .jpg, .png, .gif format allowed'));
  },
});


app.post('/create-event', upload.single('eventImage'), async function (request, response) {
  const eventTitle = request.body.eventTitle
  const eventDate = request.body.eventDate
  const eventSalesDate = request.body.eventSalesDate
  const eventTicketLimit = request.body.eventTicketLimit
  const eventDescription = request.body.eventDescription
  const eventOrganizer = request.body.eventOrganizer
  const eventImage = request.file.buffer.toString('base64')
  const eventForms = request.body.eventForms
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  console.log('#########################################################')
  const errors = validateCreateEvent(eventTitle, eventDate, eventSalesDate, eventTicketLimit, eventDescription, eventForms)
  const connection = await pool.getConnection()
  if (errors.length == 0) {
    try {
      await connection.query('INSERT INTO events (eventTitle, eventDate, eventSalesDate, eventTicketLimit, eventDescription, eventOrganizer, eventImage, eventForms) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [eventTitle, eventDate, eventSalesDate, eventTicketLimit, eventDescription, eventOrganizer, eventImage, eventForms]);
      response.status(200).json();
      console.log("Upload Succesfull")
    } catch (error) {
      console.log(error)
      response.status(500).send('Internal Server Error')
    } finally {
      connection.release()
    }
  } else {
    response.status(400).json(errors)
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
      event.eventTime = event.eventDate.toISOString().substring(11, 16)
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
  try {
    const query = "SELECT * FROM comments WHERE commentEventID = ?"
    const comments = await connection.query(query, [eventID])
    console.log("Sending 200")
    response.status(200).json(comments)
  } catch (error) {
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
    if(account.length === 0 ){
      console.log("account not found")
      response.status(401).json({ error: "invalid_grant" });
    } else {
      bcrypt.compare(password, account[0].accountHash).then(function (result) {
        console.log(result)
        if (result) {
          const payload = {
            isLoggedIn: true,
            userId: account[0].accountID
          }
          console.log(payload[0])
          jwt.sign(payload, ACCESS_TOKEN_SECRET, function (err, token) {
            if (err) {
              console.log(err, "sending 500")
              console.log("error i backend")
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
    }
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
    const checkIfUserExistQuery = 'SELECT * FROM accounts WHERE accountUsername = ?'
    console.log(account)
    console.log("användarnamn här över ")
    const rows = await connection.query(checkIfUserExistQuery, [account.username])
    console.log("Result of username check:", rows)
    if(rows.length > 0){
      console.log(account)
      console.log("Username alredy exists")
      response.status(409).send('Username alredy exists')
      return
    }else {
    console.log(account)
    const query = 'INSERT INTO accounts (accountUsername, accountHash) VALUES (? , ?)'
    console.log("Hashing:", account.password)
    const hashedPassword = await bcrypt.hash(account.password, saltRounds)
    connection.query(query, [account.username, hashedPassword])
    console.log(account.username + ' created')
    response.status(200).end()
    }
  } catch (error) {
    console.log(error)
    response.status(500).end()
  } finally {
    connection.release()
  }
})

app.post("/events/:id/create-comment", authenticateToken , async function (request, response) {
  const eventID = request.params.id
  const userId = request.user.id
  console.log("Received POST/events/", eventID, "/create-comment", username )

  const comment = request.body
  const connection = await pool.getConnection()
  
  try {
    const query = 'INSERT INTO comments (commentAuthor, commentBody, commentEventID, userID) VALUES (?, ?, ?, ?)'
    connection.query(query, [comment.commentAuthor, comment.commentBody, eventID, userId])
    response.status(200).end()
  } catch (error) {
    console.log(error)
    response.status(500).end()
  } finally {
    connection.release()
  }
})


/*
app.put("/events/:id/create-comment", async function (request, response) {
  const eventID = request.params.id
  console.log("Received PUT/events/", eventID, "/create-comment", username )

  const comment = request.body
  const connection = await pool.getConnection()
  
  try {
    const query = 'UPDATE comments SET commentBody = ? where commentAuthor= ? (commentAuthor, commentBody, commentEventID) VALUES (?, ?, ?)'
    connection.query(query, [comment.commentAuthor, comment.commentBody, eventID])
    response.status(200).end()
  } catch (error) {
    console.log(error)
    response.status(500).end()
  } finally {
    connection.release()
  }
})
*/

/* DENNA HÄR ÖVER ÄR UPDATE FOR COMMENTS 
*/


app.listen(8080, () => {
  console.log('Server started on port 8080')
})


function validateCreateEvent(eventTitle, eventDate, eventSalesDate, eventTicketLimit, eventDescription, eventForms) {
  const errors = []


  if (eventTitle < EVENT_TITLE_MIN_LENGTH) {
    errors.push('Title must contain a minimum of ' + EVENT_TITLE_MIN_LENGTH + ' characters')
  } else if (eventTitle > EVENT_TITLE_MAX_LENGTH) {
    errors.push('Title can not contain more than ' + EVENT_TITLE_MAX_LENGTH + ' characters')
  }
  const today = generateFormatedDate()
  if (eventDate < today) {
    errors.push('Event date must be in the future')
  }
  if (eventSalesDate > eventDate) {
    errors.push('Ticket sales date must be before event date')
  }
  if (eventTicketLimit < 1) {
    errors.push('There must be tickets for sale')
  }
  if (eventDescription < EVENT_DESCRIPTION_MIN_LENGTH) {
    errors.push('Event description must contain a minimum of ' + EVENT_DESCRIPTION_MIN_LENGTH + ' characters')
  } else if (eventDescription > EVENT_DESCRIPTION_MAX_LENGTH) {
    errors.push('Event description can not contain more than ' + EVENT_DESCRIPTION_MAX_LENGTH + ' characters')
  }

  //NEED TO VALIDATE EVENT FORMS FOR BAD HTML

  return errors
}

function generateFormatedDate() {
  let currentDate = new Date();
  return currentDate.toLocaleString('default', { year: 'numeric' }) + '-'
    + currentDate.toLocaleString('default', { month: '2-digit' }) + '-'
    + currentDate.toLocaleString('default', { day: '2-digit' })
}



function authenticateToken(requset, response, next) {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return response.sendStatus(401); // Unauthorized

  jwt.verify(token, ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return response.sendStatus(403); // Forbidden
    request.user = user;
    next();
  });
}
