# liri-node-app
performs multiple searches on node command line:

node based app to search spotify api using song titles

OMDB for movie info based on title

pulls last 20 tweets for user (as defined by their info in keys.js)  
format for keys.js below(replace secret with your own info):

 exports.twitterKeys = {
  consumer_key: '<secret>',
  consumer_secret: '<secret>',
  access_token_key: '<secret>',
  access_token_secret: '<secret>'
};

performs a search based on commands left in a file called 'random.txt'


