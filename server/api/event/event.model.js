'use strict';


module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    onlyDays: DataTypes.BOOLEAN,
    private: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models){
        Event.belongsTo(models.User);
        Event.hasMany(models.Time);
        Event.hasMany(models.Contact);
      }
    }
  });

  return Event;
};