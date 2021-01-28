const { Model, DataTypes } = require('sequelize');

class Exemplary extends Model {
  static init(connection) {
    super.init(
      {
        title: DataTypes.STRING(480),
        subtitle: DataTypes.STRING(480),
        subject: DataTypes.STRING(1100),
        amount: DataTypes.INTEGER,
        year: DataTypes.STRING(100),
        edition: DataTypes.STRING(450),
        isbn: DataTypes.STRING(780),
        issn: DataTypes.STRING(780)
      },
      {
        sequelize: connection
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Author, {
      foreignKey: 'author_id',
      as: 'author'
    });

    this.belongsTo(models.ContentType, {
      foreignKey: 'content_type_id',
      as: 'content_type'
    });

    this.belongsTo(models.Publisher, {
      foreignKey: 'publisher_id',
      as: 'publisher'
    });
  }
}

module.exports = Exemplary;
