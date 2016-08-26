var express = require('express');
var router = express.Router();
var passport = require('../config/ppConfig');

var db = require('../models');

router.get('/artists', function(req, res) {
  db.artist.findAll().then(function(artists) {
    // res.render('artists', { name: name, description: description, imageUrl: imageUrl});
    res.render('artists', { artists: artists});
});

});

router.get('/artists/:id', function(req, res) {
  db.artist.find({
    where: {
      id: req.params.id
    }
  }).then(function(artist){
     var YouTube = require('youtube-node');

  var youTube = new YouTube();

  youTube.setKey('AIzaSyAgFG86aqJTlhK5zuz5j4VgzoVY1-JzefU');

  youTube.search(artist.name + '(official video)', 5, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
    res.render('show', { artist: artist, result: result });
    console.log(JSON.stringify(result, null, 2));
  }
});
  });
});



module.exports = router;
