const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');
const User = require('./user');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
});

Product.belongsTo(User, { foreignKey: 'sellerId' });

module.exports = Product;
