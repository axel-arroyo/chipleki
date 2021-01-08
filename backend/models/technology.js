"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Technology.belongsTo(models.Developer, {
        foreignKey: "id_developer",
      });
    }
  }
  Technology.init(
    {
      js: DataTypes.BOOLEAN,
      react: DataTypes.BOOLEAN,
      nodejs: DataTypes.BOOLEAN,
      github: DataTypes.BOOLEAN,
      id_developer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Technology",
    }
  );
  return Technology;
};
