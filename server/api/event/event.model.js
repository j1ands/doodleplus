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
    sendername: DataTypes.STRING,
    senderemail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    onlyDays: DataTypes.BOOLEAN,
    private: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models){
        Event.belongsTo(models.User);
        Event.hasMany(models.Time);
        Event.belongsToMany(models.Contact, {through: 'EventContacts'});
      }
    }
  });

  return Event;
};
