"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Requirement.belongsTo(models.Project, {
        foreignKey: "id_project",
      });
      Requirement.belongsTo(models.Developer, {
        foreignKey: "id_developer",
      });
      Requirement.hasMany(models.Quotation, {
        foreignKey: "id_requirement",
        onDelete: "CASCADE",
      });
    }
  }
  Requirement.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      finished: DataTypes.BOOLEAN,
      estimated_time: DataTypes.STRING,
      deadline: DataTypes.DATEONLY,
      id_project: DataTypes.INTEGER,
      id_developer: DataTypes.INTEGER,
      priority: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Requirement",
    }
  );
  return Requirement;
};
