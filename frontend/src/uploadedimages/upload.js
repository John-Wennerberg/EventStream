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