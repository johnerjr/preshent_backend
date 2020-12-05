let express = require('express');
let auth = require('../middleware/auth');
let router = express.Router();
let userController = require('../controller/userController');

router.get('/adminDetail', auth, userController.adminDetail);
router.put('/updateProfile', userController.updateProfile);


// router.post('/userSignup', authController.adminSignUp);
// router.post('/userSignin', authController.adminSignIn);
// router.post('/userPass', authController.forgotPass);
// router.post('/setpassword', authController.setPassword);
// router.post('/changePassword', authController.changePassword);
// router.post('/postSetPassword', authController.postSetPassword);
// router.post('/userMediaLogin', authController.userMediaLogin);



module.exports = router;
