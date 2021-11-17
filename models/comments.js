'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // Model has custom methods that can do CRUD operations
    class Comment extends Model { }

    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        parentid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postid: { // the postid to which the comments belong to
            type: DataTypes.UUID,
            allowNull: false
        },
        commentid: { // unique identifier for each commment
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        content: { // content of the content
            type: DataTypes.TEXT,
            allowNull: false
        },
        username: { // username commenting
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'comments',
        modelName: 'Comment',
        timestamps: false
    });

    return Comment;
};