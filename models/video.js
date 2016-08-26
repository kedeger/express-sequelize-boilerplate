'use strict';
module.exports = function(sequelize, DataTypes) {
  var video = sequelize.define('video', {
    title: DataTypes.STRING,
    youtubeName: DataTypes.STRING,
    date: DataTypes.STRING,
    youtubeUrl: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    artistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.video.belongsTo(models.artist);
      }
    }
  });
  return video;
};
