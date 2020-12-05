let express = require('express');
let router = express.Router();
let authController = require('../controller/authController');

router.post('/adminsignup', authController.adminSignUp);
router.post('/adminsignin', authController.adminSignIn);
router.post('/forgotPass', authController.forgotPass);
router.post('/setpassword', authController.setPassword);
router.post('/changePassword', authController.changePassword);
router.post('/postSetPassword', authController.postSetPassword);
router.post('/userMediaLogin', authController.userMediaLogin);

module.exports = router;
