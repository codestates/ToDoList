'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotToDoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NotToDoList.init({
    userId: DataTypes.NUMBER,
    list: DataTypes.STRING,
    planned_time: DataTypes.NUMBER,
    time: DataTypes.NUMBER,
    theme: DataTypes.STRING,
    checkBox: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NotToDoList',
  });
  return NotToDoList;
};