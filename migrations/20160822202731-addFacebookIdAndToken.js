'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'facebook_Id', Sequelize.STRING).then(function() {
      return queryInterface.addColumn('users', 'facebookToken', Sequelize.STRING);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'facebookToken', Sequelize.STRING).then(function() {
      return queryInterface.removeColumn('users', 'facebook_Id');
    });
  }
};
