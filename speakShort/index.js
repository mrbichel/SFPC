
var request = require('request');
var Q = require('q');

var txt = "Packed house for our Spring 2015 welcome party. ⚡Thanks to our amazing community!";

var txt = "Leave a LIKE for more";

var getWord = function(word) {

	var deferred = Q.defer();

  	request('http://api.datamuse.com/words?rd='+word.replace(/ /g, '+'), function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    //console.log(body) // Show the HTML for the Google homepage. 
		    var jsonObj = JSON.parse(body);

		    if(jsonObj.length > 0) {
				console.log(jsonObj[0]);

		    	deferred.resolve(jsonObj[0].word);
		    } else {
		    	deferred.resolve(word);
		    }


		  } else {
		  	deferred.reject(new Error("API failure: " + error.message + "(" + response.statusCode+ ")."));
		  }
		});

  	return deferred.promise;
};


var translateTxt = function(txt) {

	var words = txt.split(" ");
	var newTxt = "";

	promises = [];

	for(w in words) {
		promises.push(getWord(words[w]));
	}

	Q.allSettled(promises)
	.then(function (results) {
	    results.forEach(function (result) {
	        if (result.state === "fulfilled") {
	            var value = result.value;
	            newTxt += value + " ";
	        } else {
	            var reason = result.reason;
	        }
	    });

	   console.log(newTxt);
	    
	});


}


// todo handle dots commas and special chars


translateTxt(txt);
