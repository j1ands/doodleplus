'use strict';

module.exports = function(sequelize, DataTypes) {
  var Time =  sequelize.define('Time', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    time: DataTypes.BIGINT
  },{
    classMethods: {
      associate: function(models){
        Time.belongsTo(models.Event);
        Time.hasMany(models.Response);
      }
    }
  });

  return Time;
};


// Time has many Response
// Response.hasOne()
