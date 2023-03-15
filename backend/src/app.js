import express from 'express'
import jwt from 'jsonwebtoken'
import {createPool} from 'mariadb'


const ACCESS_TOKEN_SECRET = "oaipfgauighASHFjagh"
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

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function (request, response, next) {

  response.set("Access-Control-Allow-Origin", "*")
  response.set("Access-Control-Allow-Methods", "*")
  response.set("Access-Control-Allow-Headers", "*")
  response.set("Access-Control-Expose-Headers", "*")

  next()

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

app.listen(8080)