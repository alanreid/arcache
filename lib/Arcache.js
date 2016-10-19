
var KeyStorage = require('./KeyStorage'),
    ValueStorage = require('./ValueStorage'),
    winston = require('winston'),
    config = require('../config');

winston.level = config.arcache.logLevel;

var Arcache = {

  get: function(key, callback) {

    winston.debug('Arcache GET ' + key);

    KeyStorage(config.arcache.keyDriver).get(key, function(valueMetadata) {
      ValueStorage(valueMetadata.get('valueDriver')).get(valueMetadata, callback);
    });
  },

  set: function(key, value, callback) {

    winston.debug('Arcache SET ' + key);

    ValueStorage(config.arcache.valueDriver).set(key, value, function(valueMetadata) {
      KeyStorage(config.arcache.keyDriver).set(key, valueMetadata, callback);
    });
  }

}

module.exports = Arcache;