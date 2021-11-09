'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // Model has custom methods that can do CRUD operations
  class User extends Model {}
  
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bbpoints: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tabelName: 'users',
    modelName: 'User',
    timestamps: false
  });

  return User;
};