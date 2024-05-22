const express = require("express");
const router = express.Router();
const googleAuthContoller = require("../app/api/controllers/google_auth")

router.post('/', googleAuthContoller.create)
router.post('/getGoogleEmail', googleAuthContoller.getUserByEmail)

module.exports = router;