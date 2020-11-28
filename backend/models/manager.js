'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Manager.hasOne(models.Project,{
        foreignKey:"manager_email"
      });
    }
  };
  Manager.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    id_project: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Manager',
  });
  return Manager;
};