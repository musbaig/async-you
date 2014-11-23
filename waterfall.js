var http = require('http'),
    fs = require('fs'),
    async = require('async');

async.waterfall([
  function(callback) {
    var filepath = process.argv.slice(2);

    fs.readFile(filepath[0], 'utf8', function(err, data) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  },

  function(url, callback) {
    var body = '';

    http.get(url, function(res) {

      res.on('data', function(chunk) {
        body += chunk.toString();
      });

      res.on('end', function() {
        callback(null, body);
      });
    }).on('error', function(err) {
      callback(err);
    });
  }
], function(err, result) {
  if (err) return console.log(err);
  console.log(result);
});
