'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exemplares_acervos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      autor: { type: Sequelize.STRING(2000) },
      registro_sistema: { type: Sequelize.STRING(2000) },
      tipo_material: { type: Sequelize.STRING(2000) },
      quantidade: { type: Sequelize.STRING(2000) },
      assunto: { type: Sequelize.STRING(2000) },
      ano: { type: Sequelize.STRING(2000) },
      issn: { type: Sequelize.STRING(2000) },
      sub_titulo: { type: Sequelize.STRING(2000) },
      isbn: { type: Sequelize.STRING(2000) },
      edicao: { type: Sequelize.STRING(2000) },
      titulo: { type: Sequelize.STRING(2000) },
      editora: { type: Sequelize.STRING(2000) },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('exemplares_acervos');
  }
};
