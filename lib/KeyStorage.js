
var ValueMetadata = require('./ValueMetadata'),
    drivers = require('./DriverLoader'),
    winston = require('winston'),
    config = require('../config');

winston.level = config.arcache.logLevel;

var KeyStorage = function(driverName) {

  return {

    get: function(key, callback) {

      winston.debug('KeyStorage: GET ' + key);

      drivers[driverName](config).get(key, function(serializedValueMetadata) {
        var valueMetadata = new ValueMetadata();
        valueMetadata.unserialize(serializedValueMetadata);
        callback(valueMetadata);
      });
    },

    set: function(key, valueMetadata, callback) {

      winston.debug('KeyStorage: SET ' + key);

      drivers[driverName](config).set(key, valueMetadata.serialize(), function() {
        callback();
      });
    }

  }

};

module.exports = KeyStorage;