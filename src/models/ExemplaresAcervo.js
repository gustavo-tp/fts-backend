const { Model, DataTypes } = require('sequelize');

class ExemplaresAcervo extends Model {
  static init(connection) {
    super.init(
      {
        autor: DataTypes.STRING(2000),
        registro_sistema: DataTypes.STRING(2000),
        tipo_material: DataTypes.STRING(2000),
        quantidade: DataTypes.STRING(2000),
        assunto: DataTypes.STRING(2000),
        ano: DataTypes.STRING(2000),
        issn: DataTypes.STRING(2000),
        sub_titulo: DataTypes.STRING(2000),
        isbn: DataTypes.STRING(2000),
        edicao: DataTypes.STRING(2000),
        titulo: DataTypes.STRING(2000),
        editora: DataTypes.STRING(2000),
      },
      {
        sequelize: connection
      }
    );
  }

  static associate(models) {}
}

module.exports = ExemplaresAcervo;
