
var ValueMetadata = require('./ValueMetadata'),
    drivers = require('./DriverLoader'),
    winston = require('winston'),
    config = require('../config');

winston.level = config.arcache.logLevel;

var ValueStorage = function(driverName) {

  return {

    get: function(valueMetadata, callback) {

      winston.debug('ValueStorage: GET ' + valueMetadata.get('key'));

      drivers[driverName](config).get(valueMetadata.get('key'), function(value) {
        callback(value);
      });
    },

    set: function(key, value, callback) {

      winston.debug('ValueStorage: SET ' + key);

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