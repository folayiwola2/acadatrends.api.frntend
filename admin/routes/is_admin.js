const express = require('express');
const router = express.Router();
const adminController = require('../app/api/controllers/is_admin')



router.post('/register', adminController.create);
router.post('/authenticate', adminController.authenticate)

router.put('/:adminId', adminController.updateById);
router.delete('/:adminId', adminController.deleteById);
router.get('/', adminController.getAll)
router.post('/forgot-password', adminController.forgotPassword)
router.post('/reset-password', adminController.resetPassword)
router.get('/:adminId', adminController.getById)
// router.post('/adminImage', adminController.createImage)

module.exports = router;