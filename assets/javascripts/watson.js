var songLyricsForWatson = [];
var watsonQuery = false;

function polarityPlaylistSearch(playlistIDforWatson){

  // Resets in case it is called more than 1 time...
  watsonQuery = true;
  songLyricsForWatson = [];
  
  // AJAX call in Spotify that uses "async: false" to wait until its done to proceed
  getUserPlaylistSongs(playlistIDforWatson);

  // Loop through all the songs and get their lyrics
  for(var j = 0; j < currentPlaylistSongObjects.length; j++){

    var currentSongName = currentPlaylistSongObjects[j].songName;
    var currentArtistName = currentPlaylistSongObjects[j].artistName;

    // AJAX calls in Musix that use "async: false" to wait until done to proceed
    queryMusixForId(currentArtistName, currentSongName, "");

    // Push current song lyrics to Watson list (musixLyrics is global at each increment of j)
    songLyricsForWatson.push(musixLyrics);
  }

  // Resets in case it is called more than 1 time...
  watsonQuery = false;

  console.log(songLyricsForWatson)
}

// Ryan, u will need to pass in your own spotify playlist id here... (log in to ur spotify account and right click a playlist to get one... also dont forget to update the first 2 lines of spotify.js with ur own spotifyId)
  //polarityPlaylistSearch("3ekUHhJ6QWQ6tM0KHO525Y"); 

// rest assured the code works though, if u cant get a result here, then comment out line 33 and use the below array as a data sample to make your emotion calls
// again the key for the AJAX to wait is... "$.ajax({url:  queryURL, async : false, method: 'GET'}).done(function(response){" ... use that for ur call to the other API
sampleWatsonLyricsResult = ["See me comin' to town with my soul Straight down …s Broke down out in a ditch of old rubbish ...  ", "I heard sirens in my head From the first time tha…opes up Cause then I'll never get let down ...  ", "So if you're lonely, you know I'm here waiting fo…You don't know You say, you don't go ...  ", "Giddy up, giddy it up Giddy up, giddy up  Wanna m…our life Live it once, can't live it twice ...  ", "I've been alone with you inside my mind And in my… what to do And I want to tell you so much ...  "];
//console.log(sampleWatsonLyricsResult)

//Running song lyrics from playlist through sentimood.js
function getCurrentSongSentimood(songLyrics){
for (var i = 0; i < songLyrics.length; i++){


var sentiment = new Sentimood();
var currentSongLyric = songLyrics[i];

var currentSongLyricSentiment = sentiment.analyze(currentSongLyric);

console.log(currentSongLyricSentiment)
if(currentPlaylistLyricSentiment === 0){
  $('#spotify-pane').html("Content")
}else(currentPlaylistLyricSentiment === -1 || === -2 || === -3){
  $('#spotify-pane').html("Sad")
}else(currentPlaylistLyricSentiment === -4 || === -5 || ===-6){
  $('#spotify-pane').html("Bummer")
}else(currentPlaylistLyricSentiment === -7 || === -8 || <= -9){
  $('#spotify-pane').html("You ok?")
}else(currentPlaylistLyricSentiment === 1 || === 2 || === 3){
  $('#spotify-pane').html("Chill")
}else(currentPlaylistLyricSentiment === 4 || === 5 || === 6){
  $('#spotify-pane').html("Happy")
}else(currentPlaylistLyricSentiment === 7 || === 8 || === >= 9){
  $('#spotify-pane').html("Ecstatic")
}


}
getPlaylistSentimood(songLyrics);
//console.log(currentSongLyric)
//console.log(currentSongLyricSentiment)

function getPlaylistSentimood(songLyricsForWatson){
  for(var i = 0; i < songLyricsForWatson.length; i ++){

    var sentiment = new Sentimood();
    var currentPlaylistLyric = songLyricsForWaton[i];

    var currentPlaylistLyricSentiment = sentiment.analyze(currentPlaylistLyric);

    console.log(currentPlaylistLyricSentiment)
  }
}

getPlaylistSentimood();

//Trying a new api that allows bulk text analysis.
//sentity.io

/*var polarity;
var polarityResponse;
function watsonPlaylistSearch(){
  
  var queryURL = "https://api.sentity.io/v1/sentiment/account?api_key=f0434f8e6aa029f895c356aac086c9efe88f55b8" + sampleWatsonLyricsResult;
  $.ajax({url: queryURL, async : false, method: 'GET'})
   .done(function(musicPolarityResponse){
     console.log(queryURL);
     console.log(musicPolarityResponse);*/

     //Globally store the polarity
     //polarityResponse = polarity;

     //Collect the polarity and confidence
     //polarity = musicPolarityResponse.polarity.confidence;

     //Initiate next AJAX call
     //watsonPlaylistSearch(sampleWatsonLyricsResult);
    /*});
}

/*Running the current song through the Text Gain API
function currentSongPolarity(){
  var apiKey = "f0434f8e6aa029f895c356aac086c9efe88f55b8"
  var queryURL = "https://api.sentity.io/v1/sentiment=" + apiKey;
  $.ajax({url: queryURL, method: 'GET'})
    .done(function(currentPolarity) {
      console.log(queryURL);
      console.log(currentPolarity); 

      //Globally store the polarity
      polarityResponse = polarity;

      //Collect the polarity and confidence
      polarity = musicPolarityResponse.polarity.confidence; 
    });  
} */


/*watsonPlaylistSearch();*/
/*currentSongPolarity();
*/







