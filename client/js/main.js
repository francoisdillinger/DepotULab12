 $(document).ready(function(){
/*Using document ready runs code only after the DOM is ready for js code to run more on that here: https://learn.jquery.com/using-jquery-core/document-ready */
	// Declared these variables outside the functions to make them global.
    var finishedTweets = [];
    var tweetUserNames = [];
    var newTweet = $("#tweet-box");
    var name = "bot";
    
    // This function is called when the 'Post' button is clicked.
    $('#postIt').click(function(){
        
                function postData() {
/*This function should create a post request using jquery. When posted it should:
1) Add tweets to the 'database'
2) After posted prepend message to list of messages and clear input box */
                    var tweetObject = {
                        // This object sets the tweet to the value of what the tweet-box contains.
                        text: newTweet.val(),
                        // The user name is set to 'bot'.
                        userName: name
                    };
                    // This variable is the tweet oject stringified.
                    var tweets = JSON.stringify(tweetObject);
                    // Here is the AJAX request for 'POST'ing the tweet to the server.
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:3000/messages',
                        data: tweets
                    // If successful then it will console log the following message.
                    }).then(function() {
                        console.log('Its posting');
                    // If not successful it will log the following message and the error.    
                     },function(err) {
                        console.log('Something went wrong.');
                        console.log(err);
                            }); ;
                    // This resets the input box so its empty after a new tweet is submitted.        
                      $(newTweet).val(''); 
                    }
                });


// This function is called when the 'Submit' button is clicked.
    $("#submit").click(function(){
	            function getData() {
/*This function should make a get request from 'database', parse the data and prepend each to the page*/
                 // The request to 'GET' the tweets from the server.
                 $.ajax({
                     type: 'GET',
                     url: 'http://localhost:3000/messages',
                    // If successful it will console log the following message as well as finish the commands.
                    }).then(function(messages) {
                        console.log('The variable messages should contain an array of tweets');
                        // This variable is of the messages retrieved and split up.
                        var splitTheseTweets = messages.split('\n');
                        // This loop with run through all of the tweets.
                        for(var i = 0; i < messages.length; i++) {
                        // I kept getting 'VM78:1 Uncaught SyntaxError: Unexpected end of input'.
                        // The following line of code fixed it, I'm sure there is another way to fix it but I haven't found it yet.    
                            if (!splitTheseTweets[i]) continue;
                            // This parses the tweets to make them 'readable'.
                            var readableTweets = $.parseJSON(splitTheseTweets[i]);
                            // Pushing the tweets and names into their respective arrays.
                            finishedTweets.push(readableTweets.text);
                            tweetUserNames.push(readableTweets.userName); 
                            // I'm sure there is a cleaner way of doing this. 
                            // The tweets were repeating so I used 'shift()', then added them to a '<li>' and prepended to page.
                            var singleTweet = finishedTweets.shift();
                            var tweetUser = tweetUserNames.shift();     
                            var line = $('<li></li>').text(singleTweet + '  -' + tweetUser);
                            $('#tweets').prepend(line);                                                                     
                        };
                    // If the request fails it will log the following message as well as the error.                           
                    }, function(err) {
                        console.log('Something went wrong.');
                        console.log(err);
                    }); ;
                    
                    }
/*Calls function once page loaded to display tweets to page*/
    
	                 getData();
                   });
 });
