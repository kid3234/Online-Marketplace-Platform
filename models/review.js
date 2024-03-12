const { DataTypes } = require('sequelize');
const Product = require('./product');
const User = require('./user');
const { sequelize } = require('../database/connection');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Review.belongsTo(User, { foreignKey: 'buyerId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Review;
