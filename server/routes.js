var url = require('url');
var helpers = require('./helper.js');

module.exports.requestHandler = function(req, res) {
	if(url.parse(req.url).pathname === '/'){
		helpers.requestHTML(req, res);
	} else if(url.parse(req.url).pathname === '/messages'){
		if(req.method === 'GET'){
			helpers.getMessages(req, res);
		}
		if(req.method === 'POST'){
			helpers.postMessages(req, res);
		}
	} else if(req.url.slice(-2) === 'js'){
		helpers.requestJS(req, res);
	} else if(req.url.slice(-3) === 'css'){
		helpers.requestCSS(req, res);
	} else {
		res.statusCode = 404;
		res.end();
	}
};

