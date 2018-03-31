//required components
//to enbale .env secrecy
require("dotenv").config();

var keys = require("./keys.js");

//inputs from terminal
var lineInput = process.argv;
var liriAction = lineInput[2]; //if defined.
var liriInput = lineInput[3]; //if defined.

if (lineInput.length === 3 || lineInput.length === 4) {
  runSwitch();
} else {
  console.log("Check inputs and try again.");
}

function runSwitch() {
  if (
    liriAction === "my-tweets" ||
    liriAction === "spotify-this-song" ||
    liriAction === "movie-this" ||
    liriAction === "do-what-it-says"
  ) {
    switch (liriAction) {
      case "my-tweets":
        myTweets();
        break;

      case "spotify-this-song":
        spotifyThis();
        break;

      case "movie-this":
        movieThis();
        break;

      case "do-what-it-says":
        doIt();
        break;
    }
  } else {
    console.log("Check inputs and try again.");
  }
}

function myTweets() {
  var Twitter = require("twitter");
  var client = new Twitter(keys.twitter);
  var params = { screen_name: "patrickckearne1" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      //console.log(tweets);
      //console.log(response.body);
      var tweetArr = JSON.parse(response.body);

      for (i = 0; i < 20; i++) {
        console.log("Tweet " + (i + 1) + ".");
        console.log(tweetArr[i].text);
        console.log(tweetArr[i].created_at);
        console.log("");
      }
    }
  });
}

function spotifyThis() {
  if (liriInput === undefined) {
    liriInput = "The Sign";
  }
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: "track", query: liriInput, limit: "5" }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    //console.log(data);
    console.log(data.tracks.limit);
    console.log(data.tracks.items[0]); //This is fucking complicated.
    //we're going to need to figure out how to manipulate the data.
    //artist
    //the song's name
    //a preview link of song from Spotify
    //the albumn the song is from
    //console.log(JSON.stringify(data, null, 2));
  });
}

function movieThis() {
  if (liriInput === undefined) {
    liriInput = "Mr. Nobody";
  }
  var request = require("request");
  var queryUrl =
    "http://www.omdbapi.com/?t=" + liriInput + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

function doIt() {
  console.log(liriAction);
}
