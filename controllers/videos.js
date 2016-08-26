var express = require('express');
var router = express.Router();
var passport = require('../config/ppConfig');

var db = require('../models');

router.get('/videos', function(req, res) {
  res.render('videos');
});



module.exports = router;
