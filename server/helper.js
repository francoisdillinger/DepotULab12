var http = require('http');
var fs = require('fs');
var path = require('path');

module.exports = (function(){
	var Helper = {};
	Helper.getMessages = function(req, res) {
		fs.readFile('server/messages.txt', 'utf8', function(err, data){
			if(err) throw err;
			res.statusCode = 200;
			res.end(data);
		});
	};

	Helper.postMessages = function(req, res) {
		var body = '';
		req.on('data', function(data){
			body+=data;
		});
		req.on('end', function(){
			fs.appendFile('server/messages.txt', body + '\n', function(err){
				if(err) throw err;
				res.statusCode = 201;
				res.end();
			});
		});
	};

	Helper.reqResponse = function(res, data, contentType, statusCode) {
		statusCode = statusCode || 200;
		var header = {
			'Content-Type': contentType
		};
		res.writeHead(statusCode, header);
		res.write(data);
		res.end();
	};

	Helper.requestHTML = function (req, res) {
	  var that = this;

	  var file = path.join(__dirname, '../client/index.html');
	  fs.readFile(file, function (err, data) {
	    that.reqResponse(res, data, 'text/html');
	  });
	};

	Helper.requestCSS = function(req, res) {
	  var that = this;
	  var file = path.join(__dirname, '../client');

	  fs.readFile(file + req.url, function (err, data) {
	    that.reqResponse(res, data, 'text/css');
	  });
	};

	Helper.requestJS = function(req, res) {
	  var that = this;
	  var file = path.join(__dirname, '../client');

	  fs.readFile(file + req.url, function (err, data) {
	    that.reqResponse(res, data, 'application/javascript');
	  });
	};

	return Helper;
})();
