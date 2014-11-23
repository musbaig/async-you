var http = require('http'),
    async = require('async'),
    urls = process.argv.splice(2);

async.map(urls, function(url, done) {
  http.get(url, function(res) {
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
}, function(err, results) {
  if(err) return console.log(err);
  console.log(results);
});
