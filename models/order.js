const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');
const Product = require('./product');
const User = require('./user');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Order.belongsTo(User, { foreignKey: 'buyerId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Order;
