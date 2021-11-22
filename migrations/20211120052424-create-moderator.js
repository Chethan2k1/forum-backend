'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('moderators', {
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
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('moderators');
  }
};