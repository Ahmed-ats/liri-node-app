require("dotenv").config();              
 
var keys = require("./keys.js"); 
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");
var inputs = process.argv.slice(3).join(" ");
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 




function getMovie(){
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";
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

function getSong() {
  spotify.search({ type: 'track', query: inputs }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("\nArtists: " + data.tracks.items[0].artists[0].name);
    console.log("Song's name: " + data.tracks.items[0].name);
    console.log("Preview link: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);
  })
};


var artistQueryUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";

function getConcert() {
 
  axios.get(artistQueryUrl).then(
    function (response) {
      
      var events = response.data;
      ;
      for (var i = 0; i < events.length; i++) {
        console.log(events[i].venue.name);
        console.log(events[i].venue.city);
        console.log(moment(events[i].datetime).format("MM/DD/YYYY"));
        console.log("\n")
      }
    }) 
    
};
 
 

if(process.argv[2] === "movie-this" && process.argv.length === 3  ){
  inputs = "mr.nobody";
   getMovie();
}    
else if(process.argv[2] === "movie-this"  ){
    getMovie();
}
else if (process.argv[2] === "spotify-this-song" && process.argv.length === 3) {
  inputs = "Ace of Base";
  getSong()
}
else if (process.argv[2] === "spotify-this-song") {
  getSong()
} 
else if (process.argv[2] === "concert-this") {
  getConcert()
}
else if (process.argv[2] === "do-what-it-says") {
    
  fs.readFile("random.txt", "utf8", function (error, data) {


      if (error) {
        return console.log(error);
      }


      var dataArr = data.split(",");
      // console.log(dataArr);

      if (dataArr[0] === "spotify-this-song") {
        inputs = dataArr[1];
        getSong()
      }
      else if (dataArr[0] === "concert-this") {
        inputs = dataArr[1];
        console.log(inputs);
        getConcert()
      }
      else if (dataArr[0] === "movie-this") {
        inputs = dataArr[1];
        getMovie()
      }

    })
}
 else{
     
     console.log("wrong command, please type one of these commands:");
     console.log("movie-this <movie name>,");
     console.log("spotify-this-song <songs name>,");
     console.log("concert-this <artist name>,");
     console.log("or do-what-it-says")

    }