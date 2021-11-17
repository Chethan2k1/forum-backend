'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('comments', {
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};
