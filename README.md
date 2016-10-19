
#arcache
arcache is a tool that lets you store key-value pairs separately. This allows you to store the keys with one storage driver and the values with another.

With arcache you could, for example, store the keys in memory with memcached and the actual values in disk somewhere else in the network. This makes sense when you need fast access to certain objects, but don't want to fill all the memory with the actual data.

arcache is single-threaded (built with nodejs), but all calls are asynchronous and stateless. You could scale up simply by running more nodes and loadbalancing them with nginx/HAProxy/etc.

**DISCLAIMER: This library is experimental, unstable and untested 😱.**

### Installation
```
git clone https://github.com/alanreid/arcache
```

### Drivers
Drivers are in charge of storing and retrieving data (for both your keys or your values).

#### Supported drivers
* localDisk: Stores/retrieves data in the machine running arcache. Mainly for standalone usage. You have to define your `basePath` in the config file.
* memcached: Stores/retrieves data in memcached. You have to define your `hosts` and your `options` in the config file.

#### Future drivers
* networkDisk: Stores data/retrieves in a disk somewhere in the network.
* s3: Stores data/retrieves in AWS S3. You have to define your `credentials` and your `bucket` in the config file.
* mysql: Stores data/retrieves in MySQL. You have to define your `insertQuery` and your `selectQuery` in the config file.
* elasticsearch: Stores data/retrieves in Elasticsearch. You have to define your `hosts`, `index`, `options`, `indexQuery` and `searchQuery` in the config file.

### Configuration
The `config.json` file contains all required configuration values for arcache and its drivers.

arcache has its own `arcache` key, in which you can specify what driver you want to use for the keys (`keyDriver`), what driver you want to use for the values (`valueDriver`) and the `logLevel` (`error` or `debug`).

Example:
```
"arcache": {
  "keyDriver": "memcached",
  "valueDriver": "localDisk",
  "logLevel": "error"
}
```

Each driver has also its own key, and the settings may vary from driver to driver.

#### Configuring the memcached driver
These are the default values for memcached:
```
"memcached": {
  "hosts": [ "127.0.0.1:11211" ],
  "options": {
    "maxKeySize": 250,
    "maxExpiration": 2592000,
    "maxValue": 1048576,
    "poolSize": 10,
    "algorithm": "md5",
    "reconnect": 18000000,
    "timeout": 5000,
    "retries": 5,
    "failures": 5,
    "retry": 30000,
    "remove": false,
    "failOverServers": null,
    "keyCompression": true,
    "idle": 100
  },
  "keyLifetime": 10
}
```
You can find out more about the available options in the [node-memcached](https://github.com/3rd-Eden/memcached#options) documentation.

#### Configuring the localDisk driver
These are the default values for localDisk:
```
"localDisk": {
  "basePath": "~"
}
```

### Running the example file
```
node index.js
```

### Operations
arcache can handle the following operations:
* GET: Retrieves something
* SET: Stores something

### Future operations:
* DELETE: Deletes something
* SCAN-KEYS: Lists all keys
* SCAN-VALUES: Lists all values

### TODO
* Add a TCP and/or a HTTP interface.
* Use promises instead of callbacks everywhere.
* Add support for more storage drivers.
* Add support for more operations.

### License
This software is distributed under the Apache 2.0 License: http://www.apache.org/licenses/LICENSE-2.0

