'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/doodleplus-dev'
  },
  sequelize: {
    uri: 'postgres://postgres:wagner@localhost/doodleplus',
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  },

  seedDB: true
};
