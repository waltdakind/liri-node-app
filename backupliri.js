//liri.js
//request for OMDB
var request = require('request');

//fs for reading random.txt, and appending to log.txt
var fs = require('fs');

var path = './random.txt';


//spotify for looking up songs
var spotify = require('spotify');


//log.txt



//random.txt


//process.argv[0] -- node
//process.argv[1] -- liri
//process.argv[2] -- ____ choose spotify api/twitter or omdb
//process.argv[3] -- song or movie argument for spotify or omdb

var liri = process.argv[2];
if(process.argv[3]!=null) {var movieOrSong = process.argv[3];}
//send diff args to diff functions with switch / case
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
    			console.log('  Possible liri commands are:');
    			console.log('===============================');
				console.log('  my-tweets     -- this will list tweets from @waltdakind');
		    	console.log('');
				console.log('  spotify-this-song   <\'song title (use quotes but not < or >)\'>  --   this will look up a song title in spotify'); 
				console.log('');
				console.log('      <<<< WARNING -- LEAVING SONG TITLE BLANK MAY RESULT IN BLINK 182 SHOWING UP IN RESULTS >>>>'); 
		    	console.log('');
				console.log('  movie-this  <\'movie title (use quotes but not < or >)\'> --   this gives IMDB info on a given movie title');
				console.log('  Leaving movie title blank will look up "Mr. Nobody"'); 
		    	console.log('');
				console.log('  do-what-it-says    --   this calls whatever command is stored in random.txt'); 
				console.log('');
    default:
        //give possible commands
        console.log('Command \'' + liri + '\' not recognized, type \'node liri help\' for list of commands');
}




//twitter api function 'my-tweets'
//================================================
function twitter() {
	console.log('so far so good');
}





//spotify api function
//================================================
function spotifyThisSong(movieOrSong) {
	console.log('Querying Spotify now...');
	console.log('Looking for ' + movieOrSong + '...');
	console.log('===============================');
	console.log('');
spotify.search({ type: 'track', query: movieOrSong + '&limit=10' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
for(var i =0; i<10; i++) {
 	var songlist = data.tracks.items[i];
  //  console.log(songlist);

// artist(s)
	console.log('Artist:');
	console.log(songlist.artists[0].name);
	console.log('');
// song name
	console.log('Name of song:');
	console.log(songlist.name);
	console.log('');
// preview link of the song from spotify
//external_urls -- 
console.log('Link to song');
console.log(songlist.external_urls.spotify);
console.log('');
// album that the song is a part of
console.log('Album featured on:');
console.log(songlist.album.name);
console.log('');

console.log('===============================');
}

});
};

//OMDB api function
//====================================================
function movieThis(movieOrSong) {
	console.log('Searching for: ' +movieOrSong);
		request('http://www.omdbapi.com/?t='+ movieOrSong +'&plot=short&r=json&tomatoes=true', function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    var result =  JSON.parse(body);
			    //console.log(result);
			    console.log('Title:');
			    console.log(result.Title);
			    console.log('Year:');
			    console.log(result.Year);
			    console.log('Country:');
			    console.log(result.Country);
			    console.log('Language:');
			    console.log(result.Language);
			    console.log('Plot:');
			    console.log(result.Plot);
			    console.log('Actors:');
			    console.log(result.Actors);
			    console.log('Rotten Tomatoes Rating:');
			    console.log(result.tomatoRating); 
			    console.log('Rotton Tomatoes UrL:');
			   	console.log(result.tomatoURL);
			    console.log('IMDB Rating:');
			    console.log(result.imdbRating);
			  }
})
};

//doWhatItSays function reading from random.txt
//===========================================================
function doWhatItSays() {
	//check that random.txt is present for later function
fs.stat(path, function(err, stats) {
 
    if (stats.isFile()) {
        console.log('   The random.txt file is present, so the function \'do-what-it-says\' is available.');
	fs.readFile(path, 'utf8', err, function (err, data) {
			  if (err) throw err;
			 String(data);
			var stuffToDO = data.split(',',2);
			 console.log('      ' + stuffToDO[0]);
			 console.log('      ' + stuffToDO[1]);

switch(stuffToDO[0]) {
    case 'my-tweets':
        //call twitter api
        twitter();
        break;

    case 'spotify-this-song':
    	//call spotify api
    	movieOrSong = stuffToDO[1];
        if(movieOrSong==null){movieOrSong = 'what\'s my age again';}
        spotifyThisSong(movieOrSong);
        break;

    case 'movie-this':
    	//call omdb api with request
    	movieOrSong = stuffToDO[1];
    	if (movieOrSong==null){movieOrSong = 'Mr. Nobody';}
    	movieThis(movieOrSong);

        break;

    case 'help':
    	//list possible commands
    	//like an actual help file 
    			console.log('  Possible liri commands are:');
    			console.log('===============================');
				console.log('  my-tweets     -- this will list tweets from @waltdakind');
		    	console.log('');
				console.log('  spotify-this-song   <\'song title (use quotes but not < or >)\'>  --   this will look up a song title in spotify'); 
				console.log('');
				console.log('      <<<< WARNING -- LEAVING SONG TITLE BLANK MAY RESULT IN BLINK 182 SHOWING UP IN RESULTS >>>>'); 
		    	console.log('');
				console.log('  movie-this  <\'movie title (use quotes but not < or >)\'> --   this gives IMDB info on a given movie title');
				console.log('  Leaving movie title blank will look up "Mr. Nobody"'); 
		    	console.log('');
				console.log('  do-what-it-says    --   this calls whatever command is stored in random.txt'); 
				console.log('');
    default:
        //give possible commands
        console.log('Command \'' + liri + '\' not recognized, type \'node liri help\' for list of commands');
}
			});

    }
    else {
		console.log('   The random.txt file is missing, so the function \'do-what-it-says\' is unavailable.');

    		}
		});

	}
