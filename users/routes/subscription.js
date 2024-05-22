const express = require('express');
const router = express.Router();
const subscription = require("../app/api/controllers/subscription")


router.post('/confirmPayment', subscription.confirmPayment)
router.get('/', subscription.getAll);
router.get('/:subscriptiontId', subscription.getById);
// router.put('/:commentId', replyCommentController.updateById);
// router.delete('/:commentId', replyCommentController.deleteById)


module.exports = router;