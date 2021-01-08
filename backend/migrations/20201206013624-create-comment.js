"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING(4096),
      },
      creator: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "email",
          as: "creator",
        },
      },
      project: {
        type: Sequelize.INTEGER,
        references: {
          model: "Projects",
          key: "id",
          as: "project",
        },
      },
      replyOf: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Comments");
  },
};
