const { Model, DataTypes } = require('sequelize');

class ContentType extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING(30)
      },
      {
        sequelize: connection
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Exemplary, {
      foreignKey: 'content_type_id',
      as: 'exemplaries'
    });
  }
}

module.exports = ContentType;
