var Memcached = require('memcached'),
    winston = require('winston');

module.exports = function(config) {

  winston.level = config.arcache.logLevel;
  
  var memcached = new Memcached(config.memcached.hosts, config.memcached.options);

  return {
    get: function(key, callback) {

      winston.debug('Memcached: get ' + key);

      memcached.get(key, function(err, data) {
        if(err) {
          return winston.error(err);
        }
        callback(data);
      });
    },

    set: function(key, value, callback) {

      winston.debug('Memcached: set ' + key);

      memcached.set(key, value, config.memcached.keyLifetime, function(err) {
        if(err) {
          return winston.error(err);
        }
        callback();
      });
    }
  };

};