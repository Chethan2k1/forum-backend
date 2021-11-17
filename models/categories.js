'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // Model has custom methods that can do CRUD operations
    class Category extends Model { }

    Category.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'categories',
        modelName: 'Category',
        timestamps: false
    });

    return Category;
};