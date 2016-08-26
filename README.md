# liri-node-app
performs multiple searches on node command line:

node based app to search spotify api using song titles

OMDB for movie info based on title

pulls last 20 tweets for user (as defined by their info in keys.js)  
format for keys.js below(replace secret with your own info):

 exports.twitterKeys = {
  consumer_key: 'secret consumer key goes here',
  consumer_secret: 'consumer secret key here',
  access_token_key: 'secret token key',
  access_token_secret: 'and so on...'
};

performs a search based on commands left in a file called 'random.txt'

logs commands entered and search results to a a file called log.txt

# Getting Started
Run 'npm install'

