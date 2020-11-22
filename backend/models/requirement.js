'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Requirement.belongsTo(models.Analyst,{
        foreignKey:"id_analyst"
      });
      Requirement.belongsTo(models.Project,{
        foreignKey:"id_project"
      });
    }
  };
  Requirement.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    estimated_time: DataTypes.STRING,
    deadline: DataTypes.DATEONLY,
    id_project: DataTypes.INTEGER,
    id_analyst: DataTypes.INTEGER,
    priority: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Requirement',
  });
  return Requirement;
};