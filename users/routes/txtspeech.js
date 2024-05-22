const express = require("express");
const router = express.Router();
const txtspeechController = require('../app/api/controllers/txtspeech');

var multer = require('multer');
let fs = require("fs")


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Dirname", __dirname.replace('\\users\\routes', '\\uploads'))
        cb(null, __dirname.replace('\\users\\routes', '\\uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}.txt`)
    }
})

var upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } })


router.post('/', upload.single('file'), txtspeechController.create);
router.get('/', txtspeechController.getAllPdf)
router.get('/:pdfId', txtspeechController.getPdfById)
router.get('/user/:userId', txtspeechController.getPdfByUserId)
router.delete('/:pdfId', txtspeechController.deletePdf)



module.exports = router