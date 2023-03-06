




const path = require('path')
import morgan from 'morgan';
import express from 'express';
const app = express();
const multer = require('multer');
//const upload = multer({dest: 'uploads/'});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: function( request, file, callback){
        callback(null, './uploadedimages');
    },
    filename: function( request, file ,callback){
        callback(null , file.filename)
    }
});

const upload = multer({storage: storage });

export function handleFileUpload(event) {
    event.preventDefault();
    const fileInput = event.target.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = fetch('/upload' , {
            method : 'POST',
            body: formData
        });
        console.log(response);
    } catch ( error) {
        console.error(error)
    }
}





/*


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '/uploadedimages');
  },
  filename: (req, file, callback)=> {
    console.log(file),
    callback(null, file.filename);
  }
});
const upload = multer({storage : storage })

app.get("/upload" , (req, res) => {
    res.render("upload");
});


app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
  });

  app.listen(8080);
  console.log("listening on 5173")

 */


/*

const multer = require("multer");
const path = require('path')
const router = require("express").Router();
//import type { fileURLToPath } from "url";

const { find, create } = require("./createEvent.js"); //fixar den sen
const storage = multer.diskStorage({
    destination: './lib/uploadedimages',
    filename: (request, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function(request, file, callback) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
            // @ts-ignore
            request.fileValidationError = 'Only images!';
            // @ts-ignore
            return callback(new Error("Only images"), false);
        }
        callback(null,true);
    },
}).single("event_picture")

router.get("/", find);
router.post("/", upload, create)


module.exports = router


//const produtocontroller = new ProdutoController()
//export const routerProduto = Router();


//routerProduto.post("/Produto/Cadastrar",upload.array('imagens', 4), produtocontroller.cadastrar);

*/