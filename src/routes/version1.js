const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authController = require('../controller/authController');

router.post('/login', authController.login);
router.post('/register',    authController.register);

module.exports = router;
