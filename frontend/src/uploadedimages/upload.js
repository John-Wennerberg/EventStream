import multer from "multer"
import path from "path"
import { app } from "routing"
import express from "express"



const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "C:/Users/Alfre/OneDrive/Dokument/GitHub/webdevadv-project/frontend/public/Images")
    },
    filename: (request, file, callback) => {
        console.log(file)
        callback(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


app.get("/index", function (request, response) {
    response.send("upload")
})


app.post("/index", upload.single("eventImage"), function (request, response) {
    response.send('File uploaded Successfully!');      
})


app.listen(5173)