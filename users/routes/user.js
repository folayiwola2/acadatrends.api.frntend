const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/user')

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate)
router.get('/', userController.getAll);
router.get('/:userId', userController.getById);
router.put('/:userId', userController.updateById);
router.delete('/:userId', userController.deleteById);
router.delete('/', userController.deleteAll);
router.get('/verify/:token', userController.getToken);
router.post('/resend-verification', userController.resendVerificationMail);

// google route

router.post('/googleAuth', userController.googleCreate);
router.post('/googleAuthLogin', userController.googleAuthenticate);


router.post('/forgot-password', userController.forgotPassword)
router.post('/reset-password', userController.resetPassword)

module.exports = router;