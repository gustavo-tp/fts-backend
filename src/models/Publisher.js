const { Model, DataTypes } = require('sequelize');

class Publisher extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING(800)
      },
      {
        sequelize: connection
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Exemplary, {
      foreignKey: 'publisher_id',
      as: 'exemplaries'
    });
  }
}

module.exports = Publisher;
