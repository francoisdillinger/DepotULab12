 $(document).ready(function(){
/*Using document ready runs code only after the DOM is ready for js code to run more on that here: https://learn.jquery.com/using-jquery-core/document-ready */
	var finishedTweets = [];
    var tweetUserNames = [];
    var newTweet = $("#tweet-box");
    var name = "bot";
    
    
    $('#postIt').click(function(){
        
                function postData() {
/*This function should create a post request using jquery. When posted it should:
1) Add tweets to the 'database'
2) After posted prepend message to list of messages and clear input box */
                    var tweetObject = {
                        text: newTweet.val(),
                        userName: name
                    };
                    
                    var teets = JSON.stringify(tweetObject);
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:3000/messages',
                        data: teets,
                    }).then(function() {
                        console.log('Its posting');
                     },function(err) {
                        console.log('Something went wrong.');
                        console.log(err);
                            }); ;
                      $(newTweet).val(''); 
                    }
                postData();
                });


    $("#submit").click(function(){
	            function getData() {
/*This function should make a get request from 'database', parse the data and prepend each to the page*/
                 
                 $.ajax({
                     type: 'GET',
                     url: 'http://localhost:3000/messages',
                    }).then(function(messages) {
                        console.log('The variable messages should contain an array of tweets');
                        var splitTheseTweets = messages.split('\n');
                        for(var i = 0; i < messages.length; i++) {
                            if (!splitTheseTweets[i]) continue;
                            var readableTweets = $.parseJSON(splitTheseTweets[i]);
                            finishedTweets.push(readableTweets.text);
                            tweetUserNames.push(readableTweets.userName); 
                            var singleTweet = finishedTweets.shift();
                            var tweetUser = tweetUserNames.shift();     
                            var line = $('<li></li>').text(singleTweet + '  -' + tweetUser);
                            $('#tweets').prepend(line);                                                                     
                        };
                                               
                    }, function(err) {
                        console.log('Something went wrong.');
                        console.log(err);
                    }); ;
                    
                    }
/*Calls function once page loaded to display tweets to page*/
    
	                 getData();
                   });
 });
