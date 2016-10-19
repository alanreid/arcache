var fs = require('fs'),
    winston = require('winston');

module.exports = function(config) {

  winston.level = config.arcache.logLevel;

  return {
    get: function(key, callback) {

      winston.debug('LocalDisk: get ' + key);

      var normalizedPath = require('path').join(config.localDisk.basePath, '..', key);

      winston.debug('LocalDisk: normalizedPath ' + normalizedPath);

      fs.readFile(normalizedPath, function(err, data) {
          if(err) {
            return winston.error(err);
          }
          callback(data);
      });
    },

    set: function(key, value, callback) {

      winston.debug('LocalDisk: set ' + key);

      var normalizedPath = require('path').join(config.localDisk.basePath, '..', key);

      winston.debug('LocalDisk: normalizedPath ' + normalizedPath);

      fs.writeFile(normalizedPath, value, function(err) {
          if(err) {
            return winston.error(err);
          }
          callback();
      });
    }
  };

};

