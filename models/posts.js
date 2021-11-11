'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // Model has custom methods that can do CRUD operations
    class Post extends Model { }

    Post.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        postid: { // the postid which is used for as identifier by the frontend
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postHeading: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postContent: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'posts',
        modelName: 'Post',
        timestamps: false
    });

    return Post;
};