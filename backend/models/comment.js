"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: "creator",
      });
      Comment.belongsTo(models.Project, {
        foreignKey: "project",
      });
    }
  }
  Comment.init(
    {
      comment: DataTypes.STRING(4096),
      creator: DataTypes.STRING,
      replyOf: DataTypes.INTEGER,
      project: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
