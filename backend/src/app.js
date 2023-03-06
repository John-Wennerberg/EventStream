import express from 'express'
import {createPool} from 'mariadb'

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

app.get("/events", async function(request, response){
  console.log("Hello?!")
/*
app.get("login.svelte", function(request, response)) {
  console.log("rööööööv")
}
*/
/*
app.post('/upload', upload.single('file'), function(request, response) {
  response.send('File uploaded Successfully!');
});
*/
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


app.listen(8080)



