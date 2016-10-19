
var drivers = {};
var normalizedPath = require('path').join(__dirname, '..', 'drivers');

require('fs').readdirSync(normalizedPath).forEach(function(fileName) {
  drivers[fileName.replace('.js', '')] = require('../drivers/' + fileName);
});

module.exports = drivers;