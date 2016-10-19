
var ValueMetadata = require('./ValueMetadata'),
    drivers = require('./DriverLoader'),
    winston = require('winston'),
    config = require('../config');

winston.level = config.arcache.logLevel;

var ValueStorage = function(driverName) {

  return {

    get: function(valueMetadata, callback) {

      winston.debug('ValueStorage: get ' + valueMetadata.get('key'));

      drivers[driverName](config).get(valueMetadata.get('key'), function(value) {
        callback(value);
      });
    },

    set: function(key, value, callback) {

      winston.debug('ValueStorage: set ' + key);

      var valueMetadata = new ValueMetadata();
      valueMetadata.set('key', key);
      valueMetadata.set('valueDriver', driverName);

      drivers[driverName](config).set(key, value, function(value) {
        callback(valueMetadata);
      });
    },

  }

};

module.exports = ValueStorage;