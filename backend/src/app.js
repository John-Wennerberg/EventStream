import express from 'express'
import {createPool} from 'mariadb'
import multer from 'multer'
import path from 'path'
//import { events } from "/webdevadv-project/frontend/src/lib/data.js"



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

app.use(function(request, response, next){
	
	response.set("Access-Control-Allow-Origin", "*")
	response.set("Access-Control-Allow-Methods", "*")
	response.set("Access-Control-Allow-Headers", "*")
	response.set("Access-Control-Expose-Headers", "*")
	
	next()
	
})

app.get("/index", function (request, response) {
  console.log("inne i get")
  response.send("upload")
})
app.get('/images/:id', async function(req, res) {
  const id = req.params.id;
  const connection = await pool.getConnection();
  const result = await connection.query('SELECT * FROM images WHERE id = ?', [id]);
  connection.release();
  if (result.length > 0) {
    res.setHeader('Content-Type', 'image/png'); // replace 'png' with the actual image type
    res.send(result[0].content);
  } else {
    res.status(404).send('Image not found');
  }
});
/*

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/alfred/Documents/GitHub/webdevadv-project/frontend/public/images')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
*/

//const upload = multer({ storage: storage })

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/*
app.post('/index', upload.single('eventImage'), async function (req, res, next) {
  try {
    const fileContent = req.file.buffer; // get the buffer containing the file contents

    // insert the file contents into the database
    await pool.query("INSERT INTO images (filename, content) VALUES (?, ?)", [
      req.file.originalname,
      fileContent
    ]);

    res.send('File uploaded successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file');
  }
});
*/




app.post('/create-event', upload.single('eventImage'), async function (request, response) {
  const eventTitle = request.body.eventTitle
  const eventDate = request.body.eventDate
  const eventSalesDate = request.body.eventSalesDate
  const eventTicketLimit = request.body.eventTicketLimit
  const eventDescription = request.body.eventDescription
  const eventOrganizer = request.body.eventOrganizer
  const eventImage = request.file.toString('base64') // Use buffer to get the file content
  //eventImage.toString('base64')
  

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





// app.post('/create-event',upload.single('eventImage'), async function (request, response) {
//   const eventTitle = request.body.eventTitle
//   const eventDate = request.body.eventDate
//   const eventSalesDate = request.body.eventSalesDate
//   const eventTicketLimit = request.body.eventTicketLimit
//   const eventDescription = request.body.eventDescription
//   const eventOrganizer = request.body.eventOrganizer
//   const eventImage = request.file.buffer // Use buffer to get the file content


//   const connection = await pool.getConnection()
//   try {
//     let result = await connection.query('INSERT INTO events (eventTitle, eventDate, eventSalesDate, eventTicketLimit, eventDescription, eventOrganizer, eventImage) VALUES (?, ?, ?, ?, ?, ?, ?)',
//     [eventTitle, eventDate, eventSalesDate, eventTicketLimit, eventDescription, eventOrganizer, eventImage]);
//     response.status(200).json();
//     console.log("Upload Succesfull")
//   } catch (error) {
//       console.log(error)
//       response.status(500).send('Internal Server Error')
//     } finally {
//       connection.release()
//     }
  
// })


/*
app.post('/index', upload.single('eventImage'), function (req, res, next) {
  // req.file is the `eventImage` file
  // req.body will contain the text fields, if there were any
  console.log("inne i post")
  res.send('File uploaded Successfully!')
})
*/


/*
app.get("/events/:id", function(request,response){
  const id = request.params.id
  const event = events.find(e=> e.id == id)

  if(event){
    response.status(200).json(event)
  }else{
    response.status(404).end()
  }
})
*/

app.get("/events", async function(request, response){
  console.log("Hello?!")
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

app.get("/", function(request, response){
  response.send("It works")
})



app.listen(8080, () => {
  console.log('Server started on port 8080')
})




