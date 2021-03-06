// Generated by CoffeeScript 1.10.0
(function() {
  var Cuddly, IO, Promise, debug, events, os, pkg, stamp;

  events = ['dev', 'ops', 'csr'];

  stamp = function() {
    return (new Date()).toISOString();
  };

  Cuddly = function(tag, url) {
    var event, fn, host, i, len, ref, res, socket;
    if (url == null) {
      url = process.env.CUDDLY_URL;
    }
    if (url == null) {
      debug('Missing `url` or CUDDLY_URL, not reporting.', tag);
    }
    host = (ref = process.env.CUDDLY_HOST) != null ? ref : os.hostname();
    socket = null;
    res = {};
    fn = function(event) {
      if (url == null) {
        res[event] = function(error, data) {
          if (data == null) {
            data = {};
          }
        };
        return;
      }
      return res[event] = function(error, data) {
        if (data == null) {
          data = {};
        }
        data.error = error;
        data.application = tag;
        data.host = host;
        data.stamp = stamp();
        return Promise.resolve().then(function() {
          if (socket == null) {
            socket = IO(url);
          }
          return socket.emit("report_" + event, data);
        })["catch"](function(error) {
          return debug("socket: " + error);
        });
      };
    };
    for (i = 0, len = events.length; i < len; i++) {
      event = events[i];
      fn(event);
    }
    res.events = events;
    return res;
  };

  Cuddly.events = events.map(function(event) {
    return "report_" + event;
  });

  module.exports = Cuddly;

  IO = require('socket.io-client');

  Promise = require('bluebird');

  os = require('os');

  pkg = require('./package.json');

  debug = (require('debug'))(pkg.name);

}).call(this);

//# sourceMappingURL=index.js.map
