import express from 'express'
import {createPool} from 'mariadb'
import express from 'express'
import multer from 'multer'
import path from 'path'

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

app.get("/index", function (request, response) {
  response.send("upload")
})




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/Alfre/OneDrive/Dokument/GitHub/webdevadv-project/frontend/public/Images')
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
  res.send('File uploaded Successfully!')
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


app.listen(5173, () => {
  console.log('Server started on port 5173')
})



