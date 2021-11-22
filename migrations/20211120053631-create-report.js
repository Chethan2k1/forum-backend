'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('reports', {
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reports');
  }
};
