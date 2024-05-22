const express = require("express");
const router = express.Router();
const followersController = require('../app/api/controllers/followers');

router.post('/', followersController.follow);
router.get('/', followersController.getAllFollowers)
router.delete('/:followerId', followersController.unFollow)



module.exports = router