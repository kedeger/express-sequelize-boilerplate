'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'soundcloud_Id', Sequelize.STRING).then(function() {
      return queryInterface.addColumn('users', 'soundcloudToken', Sequelize.STRING);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'soundcloudToken', Sequelize.STRING).then(function() {
      return queryInterface.removeColumn('users', 'soundcloud_Id');
    });
  }
};
