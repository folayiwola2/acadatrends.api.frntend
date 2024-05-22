const express = require('express');
const router = express.Router();
const replyCommentController = require('../app/api/controllers/reply_comment');


router.post('/', replyCommentController.create)
router.get('/', replyCommentController.getAll);
router.get('/:commentId', replyCommentController.getById);
router.put('/:commentId', replyCommentController.updateById);
router.delete('/:commentId', replyCommentController.deleteById)


module.exports = router;