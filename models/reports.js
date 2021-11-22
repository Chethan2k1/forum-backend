'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // Model has custom methods that can do CRUD operations
    class Report extends Model { }

    Report.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        reportedid: { // could be a post or comment
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: { // category to which it belongs
            type: DataTypes.STRING
        },
        ispost: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'reports',
        modelName: 'Report',
        timestamps: false
    });

    return Report;
};