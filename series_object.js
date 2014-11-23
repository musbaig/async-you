var http = require('http'),
    async = require('async'),
    urls = process.argv.splice(2);

async.series({
  requestOne: function(done) {
    http.get(urls[0], function(res) {
      var body = '';

      res.on('data', function(chunk) {
        body += chunk.toString();
      });

      res.on('end', function() {
        done(null, body);
      });
    }).on('error', function(err) {
      done(err);
    })
  },

  requestTwo: function(done) {
    http.get(urls[1], function(res) {
      var body = '';

      res.on('data', function(chunk) {
        body += chunk.toString();
      });

      res.on('end', function() {
        done(null, body);
      });
    }).on('error', function(err) {
      done(err);
    })
  }
}, function(err, result) {
  if (err) return console.log(err);
  console.log(result);
});
