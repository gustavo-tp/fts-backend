'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('collection', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(480),
        allowNull: true
      },
      subtitle: {
        type: Sequelize.STRING(480),
        allowNull: true
      },
      subject: {
        type: Sequelize.STRING(1100),
        allowNull: true
      },
      author: {
        type: Sequelize.STRING(280),
        allowNull: true
      },
      content_type: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      edition: {
        type: Sequelize.STRING(450),
        allowNull: true
      },
      publisher: {
        type: Sequelize.STRING(800),
        allowNull: true
      },
      isbn: {
        type: Sequelize.STRING(780),
        allowNull: true
      },
      issn: {
        type: Sequelize.STRING(30),
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('collection');
  }
};
