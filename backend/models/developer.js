"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Developer.hasOne(models.Technology, {
        foreignKey: "id_developer",
      });
      Developer.hasOne(models.Requirement, {
        foreignKey: "id_developer",
      });
      Developer.hasMany(models.Quotation, {
        foreignKey: "id_developer",
      });
    }
  }
  Developer.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      working: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Developer",
    }
  );
  return Developer;
};
