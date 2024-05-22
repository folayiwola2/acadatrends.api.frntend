const express = require("express");
const router = express.Router();
const txtspeechDocxController = require('../app/api/controllers/txtDocx');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})

var upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } })

router.post('/', upload.single('file'), txtspeechDocxController.create);
router.get('/', txtspeechDocxController.getAllDocx)
router.get('/:docxId', txtspeechDocxController.getDocxById)
router.get('/user/:userId', txtspeechDocxController.getDocxByUserId)
router.delete('/:docxId', txtspeechDocxController.deleteDocx)



module.exports = router