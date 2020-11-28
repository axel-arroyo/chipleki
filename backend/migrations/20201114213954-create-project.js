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
      client_email: {
        type: Sequelize.STRING,
        references:{
          model:"Clients",
          key:"email",
          as:"client_email"
        }
      },
      analyst_email: {
        type: Sequelize.STRING,
        references:{
          model:"Analysts",
          key:"email",
          as:"analyst_email"
        }
      },
      manager_email: {
        type: Sequelize.STRING,
        references:{
          model:"Managers",
          key:"email",
          as:"manager_email"
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