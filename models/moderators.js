'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // Model has custom methods that can do CRUD operations
    class Moderator extends Model { }

    Moderator.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userid: { // user primary key id
            type: DataTypes.INTEGER,
        },
        category: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'moderators',
        modelName: 'Moderator',
        timestamps: false
    });

    return Moderator;
};