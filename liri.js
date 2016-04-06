//liri.js
//request for OMDB
var request = require('request');

//fs for reading random.txt, and appending to log.txt
var fs = require('fs');

var path = './random.txt';


//spotify for looking up songs
var spotify = require('spotify');


//twitter keys and such
var Twitter = require('twitter');
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys);
//log.txt
if(process.argv[2]!= null){
	var argTwo = process.argv[2];
}
else{
	var argTwo = "No 2nd argument specified";
}
if(process.argv[3]!= null){
	var argThree = process.argv[3];
}
else{
	var argThree = "No 3rd argument specified";
}
var initialCommand = process.argv[0] + ' ' + process.argv[1] + ' ' + argTwo + ' ' + "'"  + argThree + "'"  +"\n";
	fs.appendFileSync("log.txt", initialCommand + "\n");
function logAndDisplay(str) {
	console.log(str);
	fs.appendFileSync("log.txt", str + "\n");
}

//random.txt


//process.argv[0] -- node
//process.argv[1] -- liri
//process.argv[2] -- ____ choose spotify api/twitter or omdb
//process.argv[3] -- song or movie argument for spotify or omdb

var liri = process.argv[2];
if(process.argv[3]!=null) {var movieOrSong = process.argv[3];}
//send diff args to diff functions with switch / case
function mainThing(liri, movieOrSong) {
switch(liri) {
    case 'my-tweets':
        //call twitter api
        twitter();
        break;

    case 'spotify-this-song':
    	//call spotify api
        if(movieOrSong==null){movieOrSong = 'what\'s my age again';}
        spotifyThisSong(movieOrSong);
        break;

    case 'movie-this':
    	//call omdb api with request
    	if (movieOrSong==null){movieOrSong = 'Mr. Nobody';}
    	movieThis(movieOrSong);

        break;

    case 'do-what-it-says':
  		//call text inside of random.txt

  		doWhatItSays();

        break;
    case 'help':
    	//list possible commands
    	//like an actual help file 
    			logAndDisplay('  Possible liri commands are:');
    			logAndDisplay('===============================');
				logAndDisplay('  my-tweets     -- this will list tweets from @waltdakind');
		    	logAndDisplay('');
				logAndDisplay('  spotify-this-song   <\'song title (use quotes but not < or >)\'>  --   this will look up a song title in spotify'); 
				logAndDisplay('');
				logAndDisplay('      <<<< WARNING -- LEAVING SONG TITLE BLANK MAY RESULT IN BLINK 182 SHOWING UP IN RESULTS >>>>'); 
		    	logAndDisplay('');
				logAndDisplay('  movie-this  <\'movie title (use quotes but not < or >)\'> --   this gives IMDB info on a given movie title');
				logAndDisplay('  Leaving movie title blank will look up "Mr. Nobody"'); 
		    	logAndDisplay('');
				logAndDisplay('  do-what-it-says    --   this calls whatever command is stored in random.txt'); 
				logAndDisplay('');
				break;
    default:
        //give possible commands
        logAndDisplay('Command \'' + liri + '\' not recognized, type \'node liri help\' for list of commands');
        break;
}
}



//twitter api function 'my-tweets'
//================================================
function twitter() {
	logAndDisplay('so far so good');
	var params = {screen_name: 'waltdakind'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for(var i=0; i<tweets.length; i++){
    	logAndDisplay('-------------------------');
logAndDisplay(tweets[i].created_at);
logAndDisplay('');
logAndDisplay(tweets[i].text);
    	logAndDisplay('-------------------------');
    	    	logAndDisplay('');
    }
  }
});
}





//spotify api function
//================================================
function spotifyThisSong(movieOrSong) {
	logAndDisplay('Querying Spotify now...');
	logAndDisplay('Looking for ' + "'"  + movieOrSong + "'"  + '...');
	logAndDisplay('===============================');
	logAndDisplay('');
spotify.search({ type: 'track', query: movieOrSong + '&limit=10' }, function(err, data) {
    if ( err ) {
        logAndDisplay('Error occurred: ' + err);
        return;
    }
for(var i =0; i<10; i++) {
 	var songlist = data.tracks.items[i];
  //  logAndDisplay(songlist);

// artist(s)
	logAndDisplay('Artist:');
	logAndDisplay(songlist.artists[0].name);
	logAndDisplay('');
// song name
	logAndDisplay('Name of song:');
	logAndDisplay(songlist.name);
	logAndDisplay('');
// preview link of the song from spotify
//external_urls -- 
logAndDisplay('Link to song');
logAndDisplay(songlist.external_urls.spotify);
logAndDisplay('');
// album that the song is a part of
logAndDisplay('Album featured on:');
logAndDisplay(songlist.album.name);
logAndDisplay('');

logAndDisplay('===============================');
}

});
};

//OMDB api function
//====================================================
function movieThis(movieOrSong) {
	logAndDisplay('Searching for: ' +movieOrSong);
		request('http://www.omdbapi.com/?t='+ movieOrSong +'&plot=short&r=json&tomatoes=true', function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    var result =  JSON.parse(body);
			    //logAndDisplay(result);
			    logAndDisplay('Title:');
			    logAndDisplay(result.Title);
			    logAndDisplay('Year:');
			    logAndDisplay(result.Year);
			    logAndDisplay('Country:');
			    logAndDisplay(result.Country);
			    logAndDisplay('Language:');
			    logAndDisplay(result.Language);
			    logAndDisplay('Plot:');
			    logAndDisplay(result.Plot);
			    logAndDisplay('Actors:');
			    logAndDisplay(result.Actors);
			    logAndDisplay('Rotten Tomatoes Rating:');
			    logAndDisplay(result.tomatoRating); 
			    logAndDisplay('Rotton Tomatoes UrL:');
			   	logAndDisplay(result.tomatoURL);
			    logAndDisplay('IMDB Rating:');
			    logAndDisplay(result.imdbRating);
			  }
})
};

//doWhatItSays function reading from random.txt
//===========================================================
function doWhatItSays() {
	//check that random.txt is present for later function
fs.stat(path, function(err, stats) {
 
    if (stats.isFile()) {
        logAndDisplay('   The random.txt file is present, so the function \'do-what-it-says\' is available.');
	fs.readFile(path, 'utf8', err, function (err, data) {
			  if (err) throw err;
			 String(data);
			var stuffToDO = data.split(',',2);
			 logAndDisplay('      ' + stuffToDO[0]);
			 //reassign process.argv to text file crap
			 process.argv[2] = stuffToDO[0];
			  //reassign process.argv to text file crap
			 logAndDisplay('      ' + stuffToDO[1]);
			 process.argv[3] =stuffToDO[1];
mainThing(stuffToDO[0], stuffToDO[1]);
			});

    }
    else {
		logAndDisplay('   The random.txt file is missing, so the function \'do-what-it-says\' is unavailable.');

    		}
		});

	}
//========================================

//liri.js
//request for OMDB
var request = require('request');

//fs for reading random.txt, and appending to log.txt
var fs = require('fs');

var path = './random.txt';


//spotify for looking up songs
var spotify = require('spotify');


//twitter keys and such
var Twitter = require('twitter');
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys);
//log.txt
if(process.argv[2]!= null){
	var argTwo = process.argv[2];
}
else{
	var argTwo = "No 2nd argument specified";
}
if(process.argv[3]!= null){
	var argThree = process.argv[3];
}
else{
	var argThree = "No 3rd argument specified";
}
var initialCommand = process.argv[0] + ' ' + process.argv[1] + ' ' + argTwo + ' ' + "'"  + argThree + "'"  +"\n";
	fs.appendFileSync("log.txt", initialCommand + "\n");
function logAndDisplay(str) {
	console.log(str);
	fs.appendFileSync("log.txt", str + "\n");
}

//random.txt


//process.argv[0] -- node
//process.argv[1] -- liri
//process.argv[2] -- ____ choose spotify api/twitter or omdb
//process.argv[3] -- song or movie argument for spotify or omdb

var liri = process.argv[2];
if(process.argv[3]!=null) {var movieOrSong = process.argv[3];}
//send diff args to diff functions with switch / case
function mainThing(liri, movieOrSong) {
switch(liri) {
    case 'my-tweets':
        //call twitter api
        twitter();
        break;

    case 'spotify-this-song':
    	//call spotify api
        if(movieOrSong==null){movieOrSong = 'what\'s my age again';}
        spotifyThisSong(movieOrSong);
        break;

    case 'movie-this':
    	//call omdb api with request
    	if (movieOrSong==null){movieOrSong = 'Mr. Nobody';}
    	movieThis(movieOrSong);

        break;

    case 'do-what-it-says':
  		//call text inside of random.txt

  		doWhatItSays();

        break;
    case 'help':
    	//list possible commands
    	//like an actual help file 
    			logAndDisplay('  Possible liri commands are:');
    			logAndDisplay('===============================');
				logAndDisplay('  my-tweets     -- this will list tweets from @waltdakind');
		    	logAndDisplay('');
				logAndDisplay('  spotify-this-song   <\'song title (use quotes but not < or >)\'>  --   this will look up a song title in spotify'); 
				logAndDisplay('');
				logAndDisplay('      <<<< WARNING -- LEAVING SONG TITLE BLANK MAY RESULT IN BLINK 182 SHOWING UP IN RESULTS >>>>'); 
		    	logAndDisplay('');
				logAndDisplay('  movie-this  <\'movie title (use quotes but not < or >)\'> --   this gives IMDB info on a given movie title');
				logAndDisplay('  Leaving movie title blank will look up "Mr. Nobody"'); 
		    	logAndDisplay('');
				logAndDisplay('  do-what-it-says    --   this calls whatever command is stored in random.txt'); 
				logAndDisplay('');
    default:
        //give possible commands
        logAndDisplay('Command \'' + liri + '\' not recognized, type \'node liri help\' for list of commands');
}
}



//twitter api function 'my-tweets'
//================================================
function twitter() {
	var params = {screen_name: 'waltdakind'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for(var i=0; i<tweets.length; i++){
    	logAndDisplay('-------------------------');
logAndDisplay(tweets[i].created_at);
logAndDisplay('');
logAndDisplay(tweets[i].text);


    }
  }
});
}





//spotify api function
//================================================
function spotifyThisSong(movieOrSong) {
	logAndDisplay('Querying Spotify now...');
	logAndDisplay('Looking for ' + "'"  + movieOrSong + "'"  + '...');
	logAndDisplay('===============================');
	logAndDisplay('');
spotify.search({ type: 'track', query: movieOrSong + '&limit=10' }, function(err, data) {
    if ( err ) {
        logAndDisplay('Error occurred: ' + err);
        return;
    }
for(var i =0; i<10; i++) {
 	var songlist = data.tracks.items[i];
  //  logAndDisplay(songlist);

// artist(s)
	logAndDisplay('Artist:');
	logAndDisplay(songlist.artists[0].name);
	logAndDisplay('');
// song name
	logAndDisplay('Name of song:');
	logAndDisplay(songlist.name);
	logAndDisplay('');
// preview link of the song from spotify
//external_urls -- 
logAndDisplay('Link to song');
logAndDisplay(songlist.external_urls.spotify);
logAndDisplay('');
// album that the song is a part of
logAndDisplay('Album featured on:');
logAndDisplay(songlist.album.name);

logAndDisplay('===============================');
}

});
};

//OMDB api function
//====================================================
function movieThis(movieOrSong) {
	logAndDisplay('Searching for: ' +movieOrSong);
		request('http://www.omdbapi.com/?t='+ movieOrSong +'&plot=short&r=json&tomatoes=true', function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    var result =  JSON.parse(body);
			    //logAndDisplay(result);
			    logAndDisplay('Title:');
			    logAndDisplay(result.Title);
			    logAndDisplay('Year:');
			    logAndDisplay(result.Year);
			    logAndDisplay('Country:');
			    logAndDisplay(result.Country);
			    logAndDisplay('Language:');
			    logAndDisplay(result.Language);
			    logAndDisplay('Plot:');
			    logAndDisplay(result.Plot);
			    logAndDisplay('Actors:');
			    logAndDisplay(result.Actors);
			    logAndDisplay('Rotten Tomatoes Rating:');
			    logAndDisplay(result.tomatoRating); 
			    logAndDisplay('Rotton Tomatoes UrL:');
			   	logAndDisplay(result.tomatoURL);
			    logAndDisplay('IMDB Rating:');
			    logAndDisplay(result.imdbRating);
			  }
})
};

//doWhatItSays function reading from random.txt
//===========================================================
function doWhatItSays() {
	//check that random.txt is present for later function
fs.stat(path, function(err, stats) {
 
    if (stats.isFile()) {
        logAndDisplay('   The random.txt file is present, so the function \'do-what-it-says\' is available.');
	fs.readFile(path, 'utf8', err, function (err, data) {
			  if (err) throw err;
			 String(data);
			var stuffToDO = data.split(',',2);
			 logAndDisplay('      ' + stuffToDO[0]);
			 //reassign process.argv to text file crap
			 process.argv[2] = stuffToDO[0];
			  //reassign process.argv to text file crap
			 logAndDisplay('      ' + stuffToDO[1]);
			 process.argv[3] =stuffToDO[1];
mainThing(stuffToDO[0], stuffToDO[1]);
			});

    }
    else {
		logAndDisplay('   The random.txt file is missing, so the function \'do-what-it-says\' is unavailable.');

    		}
		});

	}
//========================================
mainThing(liri, movieOrSong);