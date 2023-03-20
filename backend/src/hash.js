import bcrypt from 'bcrypt'

const saltRounds = 10

password = "123321"
bcrypt.hash(password, saltRounds, function (error, hash) {
  if (error) {
    console.log(error)
  } else {
    console.log(hash)
  }
})