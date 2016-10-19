
var arcache = require('./lib/arcache');

arcache.set('HELLO', 'WORLD', function() {

  arcache.get('HELLO', function(value) {
    console.log(value.toString());
  });

});