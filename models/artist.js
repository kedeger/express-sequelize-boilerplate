'use strict';
module.exports = function(sequelize, DataTypes) {
  var artist = sequelize.define('artist', {
    name: DataTypes.STRING,
    youtubeName: DataTypes.STRING,
    description: DataTypes.STRING,
    youtubeUrls: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.artist.hasMany(models.video);
      }
    }
  });
  return artist;
};
