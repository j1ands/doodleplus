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
      },
      saveEventTimes: function(reqBody,creator,createdEvent){
        var times = [];
        //console.log('createdEvent id',createdEvent);
        reqBody.time.forEach(function(elem){
          elem.EventId = createdEvent._id;
        });
        return Time.bulkCreate(reqBody.time)
          .then(function(createdTimes){
            return createdTimes;
          });

      }
    }
  });

  return Time;
};


// Time has many Response
// Response.hasOne()
