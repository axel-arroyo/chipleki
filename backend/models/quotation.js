"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quotation.belongsTo(models.Developer, {
        foreignKey: "id_developer",
      });
      Quotation.belongsTo(models.Requirement, {
        foreignKey: "id_requirement",
        onDelete: "CASCASE",
      });
    }
  }
  Quotation.init(
    {
      value: DataTypes.INTEGER,
      id_requirement: DataTypes.INTEGER,
      id_developer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quotation",
    }
  );
  return Quotation;
};
