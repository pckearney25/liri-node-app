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
        console.log("\nTweet " + (i + 1) + ".");
        console.log(tweetArr[i].text);
        console.log(tweetArr[i].created_at);
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
  var limitNum = 10;
  spotify.search({ type: "track", query: liriInput, limit: limitNum }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      console.log(
        "\nHey. Covers, remixes, and mash-ups are popular and awesome. So here are the top ten Spotify search results:"
      );
      for (i = 0; i < limitNum; i++) {
        console.log("\nSearch Result #" + (i + 1));
        console.log("Song Title: " + data.tracks.items[i].name);
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log(
          "Spotify Preview Link: " + data.tracks.items[i].preview_url
        );
        console.log("Album: " + data.tracks.items[i].album.name);
      }
    }
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
      console.log("\nTitle: " + JSON.parse(body).Title);
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
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    liriAction = dataArr[0]; //if defined.
    liriInput = dataArr[1]; //if defined

    runSwitch2();
  });
}

function runSwitch2() {
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
        console.log(
          "Recursive function! Been there. Done that. Not doing it again!"
        );
        break;
    }
  } else {
    console.log("Check data in random.txt file and try again.");
  }
}
