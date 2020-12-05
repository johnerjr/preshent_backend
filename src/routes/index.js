const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', { title: 'Preshent E-commerce' });
});

module.exports = router;
