'use strict';
module.exports = function(sequelize, DataTypes) {
  var score = sequelize.define('score', {
    name: DataTypes.STRING,
    points: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    accuracy: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return score;
};