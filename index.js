var routes = require('./server/routes');
var http = require('http');

var server = http.createServer(routes.requestHandler);

server.listen(3000);
