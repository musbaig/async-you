var http = require('http'),
    async = require('async'),
    urls = process.argv.splice(2);

async.each(urls, function(url, done) {
  http.get(url, function(res) {
    res.on('data', function(chunk) {
    });

    res.on('end', function() {
      done(null);
    });
  }).on('error', function(err) {
    done(err);
  })
}, function(err) {
  console.log(err);
});
