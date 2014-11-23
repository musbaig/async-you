var http = require('http'),
    async = require('async'),
    url = process.argv[2];

async.reduce(['one', 'two', 'three'], 0, function(accum, item, callback) {

  var req = http.get(url + '?number=' + item, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk.toString();
    });
    res.on('end', function() {
      callback(null, accum + Number(body));
    });
  });
  req.on('error', function(err) {
    callback(err);
  })
}, function(err, result) {
  if(err) return console.log(err);
  console.log(result);
});
