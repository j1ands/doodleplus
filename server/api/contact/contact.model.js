'use strict';

module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models){
        Contact.belongsTo(models.User);
        Contact.hasMany(models.Event);
      }
    }
  });
  return Contact;
};
