'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deliver_date: {
        type: Sequelize.DATEONLY
      },
      id_client: {
        type: Sequelize.INTEGER,
        references:{
          model:"Clients",
          key:"id",
          as:"id_client"
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
      id_manager: {
        type: Sequelize.INTEGER,
        references:{
          model:"Managers",
          key:"id",
          as:"id_manager"
        }
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
    await queryInterface.dropTable('Projects');
  }
};