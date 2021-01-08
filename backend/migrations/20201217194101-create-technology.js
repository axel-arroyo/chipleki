"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Technologies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      js: {
        type: Sequelize.BOOLEAN,
      },
      react: {
        type: Sequelize.BOOLEAN,
      },
      nodejs: {
        type: Sequelize.BOOLEAN,
      },
      github: {
        type: Sequelize.BOOLEAN,
      },
      id_developer: {
        type: Sequelize.INTEGER,
        references: {
          model: "Developers",
          key: "id",
          as: "id_developer",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Technologies");
  },
};
