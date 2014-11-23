var http = require('http'),
    async = require('async'),
    url = process.argv[2],
    counter = 0,
    testString = '';

async.whilst(function() {
  return testString.trim().indexOf('meerkat') === -1;
}, function(callback) {
  var req = http.get(url, function(res) {
    var body = '';
    counter += 1;
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      testString = body;
      callback();
    })
  });

  req.on('error', function(err) {
    callback(err);
  });
}, function(err) {
  if(err) return;
  console.log(counter);
});
