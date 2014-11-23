var http = require('http'),
    async = require('async'),
    host = process.argv[2],
    port = process.argv[3];

async.series([
  function(callback) {
    async.times(5, function(id, cb) {

      var req = http.request({
        host: host,
        port: port,
        url: '/users/create',
        method: 'POST'
      }, function(res) {

        res.on('data', function(chunk) {
        });

        res.on('end', function() {
          cb();
        });

      });

      req.on('error', function(err) {
        cb(err);
      });
      req.write(JSON.stringify({ 'user_id': id + 1 }));
      req.end();

    }, function(err, results) {
      if (err) return console.log(err);
      callback(null, results);
    });
  },

  function(callback) {

    var req = http.get({
      host: host,
      port: port,
      url: '/users'
    }, function(res) {
      var body = '';

      res.on('data', function(chunk) {
        body += chunk.toString();
      });

      res.on('end', function() {
        callback(null, body);
      });
    });

    req.on('error', function(err) {
      callback(err);
    })
  }
], function(err, results) {
  if (err) return console.log(err);
  console.log(results[1]);
});
