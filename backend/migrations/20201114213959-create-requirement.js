'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Requirements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      finished: {
        type: Sequelize.BOOLEAN
      },
      estimated_time: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATEONLY
      },
      id_project: {
        type: Sequelize.INTEGER,
        references:{
          model:"Projects",
          key:"id",
          as:"id_project"
        }
      },
      id_analyst: {
        type: Sequelize.INTEGER,
        references:{
          model:"Analysts",
          key:"id",
          as:"id_analyst"
        }
      },
      priority: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Requirements');
  }
};