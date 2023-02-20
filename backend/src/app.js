const express = require('express')
const mariadb = require('mariadb')


const app = express()

async function asyncFunction(resquest, response){
  const conn = mariadb.createConnection({
    host: "localhost",
    port: 5555,
    user: "root",
    password: "abc123"
  })

  app.get("/events", async function(request, respsonse){
    try{
      const query = `SELECT * FROM events`

      const events = (await conn).query(query)

      response.status(200).json(events)
    } catch(error){
      console.log(error)
      response.status(500).end()
    }
  })

}

asyncFunction()





app.listen(8080)