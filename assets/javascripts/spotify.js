// Spotify API Query



// ------------------------------ Query 1 ------------------------------
var spotifySongResult;
function spotifySongSearch(songTitle){

  // Replace any spaces with a plus sign for query
  songTitle = songTitle.trim().replace(/ /g, "+");

  // Run an initial search to identify the song's (track) unique Spotify ID
  var queryURL = "https://api.spotify.com/v1/search?q=" + songTitle + "&type=track";
  $.ajax({url: queryURL, method: 'GET'}).done(function(songResponse) {

    // Prints the entire object to console
   // console.log(songResponse);
   spotifySongResult = songResponse;
   //console.log(songResponse)

    // Prints the Song ID from the Spotify Object to console.
    //var artistID = songResponse.tracks.items[0].id;

    // Then we build a SECOND URL to query another Spotify endpoint (this one for the tracks)
    //var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID +"/top-tracks?country=US";

  }); 
}


  // // ------------------------------ Query 2 ------------------------------
  // // We then run a second AJAX call to get the tracks associated with that Spotify ID
  // $.ajax({url: queryURLTracks, method: 'GET'}).done(function(trackResponse) {

  //   // Gets the tracks
  //   console.log(trackResponse);

  //   // Builds a Spotify player playing the top song associated with the artist. (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
  //   //var player = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+trackResponse.tracks[0].id+'" frameborder="0" allowtransparency="true"></iframe>';

  // });

