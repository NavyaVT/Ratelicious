'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Hotel, {
        foreignKey : 'hotelId',
        onDelete : "CASCADE"
      }),
      Review.belongsTo(models.User, {
        foreignKey : 'ownerId',
        onDelete : "CASCADE"
      })
    }
  }
  Review.init({
    review: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    hotelId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};