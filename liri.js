require("dotenv").config();              

// import keys.js file 
var keys = require("./keys.js");

// get axios package to use 
var axios = require("axios");



var movieName = process.argv[3];
// console.log(movieName);



function getMovie(){
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(movieQueryUrl).then(
  function(response) {
  console.log("Title: " + response.data.Title);
  console.log("Year: " + response.data.Year);
  console.log("IMDB Rating: " + response.data.imdbRating);
  console.log("Rotten Tomato: " + response.data.Ratings[0].Value);
  console.log("Country of Production: " + response.data.Country);
  console.log("Language: " + response.data.Language);
  console.log("Actors: " + response.data.Actors);
 
})};

 
 if(process.argv[2] === "movie-this" && process.argv.length === 3  ){
     movieName = "mr.nobody";
//    movieQueryUrl = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
   getMovie();
}
    
else if(process.argv[2] === "movie-this"  ){
         movieName = "";
    for(var i = 3 ; i < process.argv.length; i++){ 
         movieName += process.argv[i] + " ";
      
    }
    getMovie();
    
}
//  else{
//      console.log("wrong command, please use this form: movie-this <movie name>")
//  }
 
 




var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 

var songName = process.argv[3];


function getSong() {spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log("\nArtists: " + data.tracks.items[0].artists[0].name );
  console.log("Song's name: " + data.tracks.items[0].name);
  console.log("Preview link: " + data.tracks.items[0].preview_url );
  console.log("Album: " + data.tracks.items[0].album.name );
})};
 

if(process.argv[2] === "spotify-this-song" && process.argv.length === 3 ){
    songName = "Ace of Base";
    getSong()
}

else if (process.argv[2] === "spotify-this-song"){
    songName = "";
        for(var i = 3 ; i < process.argv.length; i++){ 
             songName += process.argv[i] + " ";
        }
    getSong()
}




var moment = require('moment');

 var artist = process.argv[3];
 
  var artistQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
 
 function getConcert() {
    
    
     axios.get(artistQueryUrl).then(
        function (response) {
            var events = response.data;
            // console.log(response.data);
            for(var i = 0; i < events.length ; i++  ){
            console.log(events[i].venue.name);
            console.log(events[i].venue.city);
            console.log(moment(events[i].datetime).format("MM/DD/YYYY"));
            console.log("\n")
         }}) };

         if (process.argv[2] === "concert-this"){
            artist = "";
            for(var i = 3 ; i < process.argv.length; i++){ 
                 artist += process.argv[i] + " ";
                 console.log(artist);
            }
            getConcert()
         }
