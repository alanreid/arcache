
var ValueMetadata = function(serializedValue) {
  this.metadata = {};
};

ValueMetadata.prototype.get = function(key) {
  return this.metadata[key];
};

ValueMetadata.prototype.set = function(key, value) {
  this.metadata[key] = value;
  return this;
};

ValueMetadata.prototype.serialize = function() {
  return JSON.stringify(this.metadata);
};

ValueMetadata.prototype.unserialize = function(serializedValue) {
  this.metadata = JSON.parse(serializedValue);
  return this.metadata;
};

module.exports = ValueMetadata;