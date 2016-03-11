### Instructions

The objective of this project is to create a mock twitter.

It is advised to globally install nodemon and mocha since a server will be used in this project. Nodemon will allow for the server to run and continuously update when changes occur in your files. Mocha will be used for some server side testing which will be run on your console.

~~~~~~
$ npm install -g nodemon mocha bower
~~~~~~

Then:

~~~~~~
$ npm install
$ bower install
~~~~~~

Note: .bowerrc file specifies the path where bower components will be installed (bootstrap and jquery dependecies).

#### Further Reading

[CommonJS - How and Why](http://0fps.net/2013/01/22/commonjs-why-and-how/)
[Bower Docs](http://bower.io/)
[Browserify](http://blakeembrey.com/articles/2013/09/introduction-to-browserify/)
Ajax requests with [jQuery](http://api.jquery.com/jquery.ajax/)
[Status Codes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

### Basic Req's
~~~~~~
$ nodemon
~~~~~~

This will run the project at http://localhost:3000/.

After the server is going run the following command within your project directory.
~~~~~~
$ npm test
~~~~~~


##### client
* index.html - Style your application from index.html.
	* It should contain a form which submits post data and a list of all tweets.
* main.js - javascript to handle the behavior on the client side of the application
	* postData:
		* create a jquery ajax request to post a new tweet
		* each message should be an object with text and userName properties (may use default username)
	* getData:
		* create a jquery ajax request to get all tweets from the backend.
		* Note: data is stored in a .txt file. Keep that in mind when parsing data for display
	* Use jquery to enable the submit button

##### server (Already done for you)
* messages.txt - text file containing tweets and where future tweets will be written.
* index.js - server side code with [nodejs](https://nodejs.org/en/docs/)
	* Starts a server to handle get and post requests from front end.
