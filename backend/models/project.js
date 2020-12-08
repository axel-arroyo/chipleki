"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Client, {
        foreignKey: "client_email",
      });
      Project.belongsTo(models.Manager, {
        foreignKey: "manager_email",
      });
      Project.belongsTo(models.Analyst, {
        foreignKey: "analyst_email",
      });
      Project.hasMany(models.Requirement, {
        foreignKey: "id_project",
      });
      Project.hasMany(models.Comment, {
        foreignKey: "project",
      });
    }
  }
  Project.init(
    {
      deliver_date: DataTypes.DATEONLY,
      client_email: DataTypes.STRING,
      analyst_email: DataTypes.STRING,
      manager_email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
