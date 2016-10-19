var fs = require('fs'),
    winston = require('winston');

module.exports = function(config) {

  winston.level = config.arcache.logLevel;

  return {
    get: function(key, callback) {

      winston.debug('LocalDisk: GET ' + key);

      var normalizedPath = require('path').join(config.localDisk.basePath, '..', key);

      fs.readFile(normalizedPath, function(err, data) {
          if(err) {
            return winston.error(err);
          }
          callback(data);
      });
    },

    set: function(key, value, callback) {

      winston.debug('LocalDisk: SET ' + key);

      var normalizedPath = require('path').join(config.localDisk.basePath, '..', key);

      fs.writeFile(normalizedPath, value, function(err) {
          if(err) {
            return winston.error(err);
          }
          callback();
      });
    }
  };

};

