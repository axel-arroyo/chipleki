'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Client,{
        foreignKey:"id_client"
      });
      Project.belongsTo(models.Manager,{
        foreignKey:"id_manager"
      });
      Project.belongsTo(models.Analyst,{
        foreignKey:"id_analyst"
      });
      Project.hasMany(models.Requirement,{
        foreignKey:"id_project"
      });
    }
  };
  Project.init({
    deliver_date: DataTypes.DATEONLY,
    id_client: DataTypes.INTEGER,
    id_analyst: DataTypes.INTEGER,
    id_manager: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};