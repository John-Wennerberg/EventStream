
const bcrypt = require('bcrypt')
const saltRounds = 10

password = ""
bcrypt.hash(password, saltRounds, function (error, hash) {
  if (error) {
    console.log(error)
  } else {
    console.log(hash)
  }
})