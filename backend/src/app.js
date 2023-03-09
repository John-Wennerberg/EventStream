import express from 'express'
import {createPool} from 'mariadb'
import multer from 'multer'
import path from 'path'
import events from "./frontend/src/lib/data.js"

const pool = createPool({
  host: "db",
  port: 3306,
  user: "root",
  password: "abc123",
  database: "abc",
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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './frontend/public/images')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

app.post('/index', upload.single('eventImage'), function (req, res, next) {
  // req.file is the `eventImage` file
  // req.body will contain the text fields, if there were any
  console.log("inne i post")
  res.send('File uploaded Successfully!')
})



app.get("/events/:id", function(request,response){
  const id = request.params.id
  const event = events.find(e=> e.id == id)

  if(event){
    response.status(200).json(event)
  }else{
    response.status(404).end()
  }
})

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




