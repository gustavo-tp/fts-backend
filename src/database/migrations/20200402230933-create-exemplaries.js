'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exemplaries', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(480),
        allowNull: false
      },
      subtitle: {
        type: Sequelize.STRING(480),
        allowNull: false
      },
      subject: {
        type: Sequelize.STRING(1100),
        allowNull: false
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'authors',
          key: 'id'
        }
      },
      content_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'content_types',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      edition: {
        type: Sequelize.STRING(450),
        allowNull: false
      },
      publisher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'publishers',
          key: 'id'
        }
      },
      isbn: {
        type: Sequelize.STRING(780),
        allowNull: true
      },
      issn: {
        type: Sequelize.STRING(780),
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('exemplaries');
  }
};
