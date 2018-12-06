require("dotenv").config();              

// import keys.js file 
var stuffINeed = require("./keys.js");

// get axios package to use 
var axios = require("axios");



// var movieName = process.argv[3];
// console.log(movieName);
// var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


// function getMovie(){
   
//     axios.get(movieQueryUrl).then(
//   function(response) {
//     // console.log(response.data);
// console.log(JSON. stringify(response.data, null, 2));
 
// })};

 
//  if(process.argv[2] === "movie-this" && process.argv.length === 3  ){

//    movieQueryUrl = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
//    getMovie();
// }
    
// else if(process.argv[2] === "movie-this"  ){
//          var movieName = "";
//     for(var i = 3 ; i < process.argv.length; i++){ 
//          movieName += process.argv[i] + " ";
//         // console.log(movieName);
//     }
//     getMovie();
// }
//  else{
//      console.log("wrong command, please use this form: movie-this <movie name>")
//  }
 
 
 var artist = process.argv[3];
 var artistQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//  console.log(artistQueryUrl);

axios.get(artistQueryUrl).then(
    function (response) {
        console.log(response.data);
        
        console.log(JSON.stringify(response.data, null, 2));
        // console.log(response.data.venue.location);
        // console.log(response.data.date)
    });
