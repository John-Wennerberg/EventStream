import express from 'express'
import jwt from 'jsonwebtoken'
import {createPool} from 'mariadb'
import multer from 'multer'
import path from 'path'
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



pool.on('error', function(error){
  console.log("Error from pool", error)
})

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(function(request, response, next){
	
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



app.get("/events/:id", async function(request, response) {
  const eventID = request.params.id;
  console.log(eventID, "i backend")
  try {
    const connection = await pool.getConnection();
    const query = "SELECT * FROM events WHERE eventID = ?";
    const events = await connection.query(query, [eventID]);

    for (const event of events) {
      event.eventImage = event.eventImage.toString("utf8");
    }

    response.status(200).json(events);
  } catch (error) {
    console.log(error);
    response.status(500).end();
  }
});



<<<<<<< HEAD
app.get("/events", async function(request, response){
  console.log("Hello?!")
  try{
    const connection = await pool.getConnection()
    const query = "SELECT * FROM events"

    const events = await connection.query(query)

    for(const event of events){
      event.eventImage = event.eventImage.toString('utf8')
    }

    response.status(200).json(events)

  }catch(error){
    console.log(error)
    response.status(500).end()
  }
=======
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function (request, response, next) {

  response.set("Access-Control-Allow-Origin", "*")
  response.set("Access-Control-Allow-Methods", "*")
  response.set("Access-Control-Allow-Headers", "*")
  response.set("Access-Control-Expose-Headers", "*")

  next()

>>>>>>> main
})

app.get("/", async function(request, response){
  console.log("Received GET /")

  try{
    const connection = await pool.getConnection()
    const query = "SELECT * FROM events"

    const events = await connection.query(query)
    
    response.status(200).json(events)

  }catch(error){
    console.log(error)
    response.status(500).end()
  }
})

app.post("/tokens", function(request, response){
  console.log("Received POST /tokens")

  const grantType = request.body.grant_type
  const username = request.body.username
  const password = request.body.password

  if(grantType  != "password"){
    response.status(400).json({ error: "unsupported_grant_type "})
    return
  }

  if(username == "john" && password == "123321"){

    const payload = {
      isLoggedIn: true
    }
    jwt.sign(payload, ACCESS_TOKEN_SECRET, function(err, token){
     if(err){
      response.status(500).end()
     } else {
      response.status(200).json({
        access_token: token,
        type: "bearer" //might be type not token_type
      })
     }
    })
  } else {
    response.status(400).json({error: "invalid_grant"})
  }

})


app.listen(8080, () => {
  console.log('Server started on port 8080')
})




