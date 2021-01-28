const { Model, DataTypes } = require('sequelize');

class Author extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING(280)
      },
      {
        sequelize: connection
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Exemplary, {
      foreignKey: 'author_id',
      as: 'exemplaries'
    });
  }
}

module.exports = Author;
