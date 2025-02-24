'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pictures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pictures.belongsTo(models.Hotel, {
        foreignKey : 'hotelId',
        onDelete : "CASCADE"
      }),
      Pictures.belongsTo(models.User, {
        foreignKey : 'ownerId',
        onDelete : "CASCADE"
      })
    }
  }
  Pictures.init({
    picture: DataTypes.TEXT,
    hotelId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pictures',
  });
  return Pictures;
};