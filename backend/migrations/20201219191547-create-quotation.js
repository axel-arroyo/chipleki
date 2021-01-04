"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Quotations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.INTEGER,
      },
      id_requirement: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Requirements",
          key: "id",
          as: "id_requirement",
        },
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
    await queryInterface.dropTable("Quotations");
  },
};
