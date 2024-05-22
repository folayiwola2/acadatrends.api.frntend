const express = require("express");
const router = express.Router();
const messageController = require("../app/api/controllers/message");

router.post('/', messageController.createMessage);
router.get('/', messageController.getMessage);
router.get('/:userId', messageController.getMessageById)
router.delete('/:messageId', messageController.deleteMessage);


module.exports = router;