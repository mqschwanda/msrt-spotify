
// xxxxxxxxxxxxxxxxxxxxxxxxxxx This is just Tom's scratch work for testing... It worked dude! Added songs to my playlist! xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//var userSpotifyId = "12122110676"; //when done, uncommment the intiailization below
//var spotifyAccessToken = "BQBCIZw6RQl_iJ5a1kVYwVtJoCvzy43IsbqKNR768H-ELLSxpH0K3oXnphrY6JBdrVnmv21aWivs0iHvUsIeoaZgu76Lab1HirA7jEkLTJrqACuUxT8ERoIpBB_ezGYvQiHvWmPo3y5PwksY4k4h7yGx6pf1KXdrwYgs1RNdnIjzhCTUG5lW5yfrUzjYliEgzUnx-om2p-Akzt3BASsZqg8kvbdXQxWorpAoxPP_YdCNWgp8r8FprB-ELIWd7Sgjf-AZCpDpo30HcYpG";
//addChildtoParentPlaylist("3ekUHhJ6QWQ6tM0KHO525Y", "4ifW6KdwgV7Ugk38iu6ukC")
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




// ---------------------------------------------------------------------------

  // LOOK IN THE CONSOLE LOG FOR THE HYPERLINKS. WE NEED TO MAKE hyperlinks for the login in button... and im thinking a log out button too. 

  // You dont need to keep this function, i just found it useful to call it from the console when troubleshooting
  function logInUser(){
    
    var msrtSpotifyClientId = "f0bec57f45dd42bead54f9a76d931a9c";

    // Log In and Link to MSRT App
    var queryURLforSpotifyToken = "https://accounts.spotify.com/authorize/?client_id=" + msrtSpotifyClientId + "&response_type=token&redirect_uri=http%3A%2F%2Fmsrt-spotify.herokuapp.com%2F&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private%20playlist-read-private%20playlist-read-collaborative";
    console.log("Log In URL...")
    console.log(queryURLforSpotifyToken);
    $('#sign-in').attr('href', queryURLforSpotifyToken);

    // Log Out (if needed in future)
    console.log("Log Out URL (if needed in future)...")
    console.log("https://accounts.spotify.com/en/status")
  }
  logInUser();


// ******************************************** END OF MAIN.JS and/or index.html ADDITIONS ********************************************************************





// ============================================== Spotify API Queries ==============================================



  // ------------------------------ Query 0 - Spotify - Search for User's unique ID ------------------------------
    //var userSpotifyId;
    //var spotifyAccessToken;

    // On page load, check the current URL
    $(document).ready(function(){

      // Check for a hash symbol in the URL (A successful login will bring the user to a URL with the Access Token encoded as a hash)
      if(window.location.hash != ""){

        // Collect the Access Token from the URL
        var cropToGetToken = window.location.hash;
        cropToGetToken = cropToGetToken.split("#access_token=");
        cropToGetToken = cropToGetToken[1];
        cropToGetToken = cropToGetToken.split("&");
        cropToGetToken = cropToGetToken[0];

        // Collect the access token from the cropped window hash
        spotifyAccessToken = cropToGetToken;

        // AJAX Call to get the User Information (using the Access Token)
        $.ajax({
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken
          },
          success: function(userInfoResponse) {
            console.log(userInfoResponse)

            // Collect the User's Spotify Id
            userSpotifyId = userInfoResponse.id;

            // Collect the User's Playlists
            // ***Maybe add a call to the getUserPlaylistIDs() here, if we do, then we need to intialize userPlaylistObjects at the top of the page
          }
        });
      }
    });



  // ------------------------------ Query 1 - Spotify - Search for Track ID ------------------------------
    var spotifySongResult;

    function spotifySongSearch(songTitle){

      // Replace any spaces with a plus sign for query
      songTitle = songTitle.trim().replace(/ /g, "+");

      // Run an initial search to identify the song's (track) unique Spotify ID
      var queryURL1 = "https://api.spotify.com/v1/search?q=" + songTitle + "&type=track";
      
        $.ajax({url: queryURL1, method: 'GET'}).done(function(songResponse) {

          // Globally store the Song Search Response
          spotifySongResult = songResponse;


          // Wait for query to finish and then print result
          printTopResults();

        });

    }

    function printTopResults() {
      // for each drop down result
      for (var i = 0; i < 5; i++) {
        var iPlus = i+1;
        $("#song-img"+iPlus).attr('src', spotifySongResult.tracks.items[i].album.images[0].url);
        $("#song-img"+iPlus).parent().data('spotifyID', spotifySongResult.tracks.items[i].id);
        // console.log("----- Spotify ID -----");
        // console.log($("#song-img"+iPlus).data('spotifyID'));
        $("#song-title"+iPlus).html(spotifySongResult.tracks.items[i].name);
        $("#song-album"+iPlus).html(spotifySongResult.tracks.items[i].album.name);
        $("#song-artist"+iPlus).html(spotifySongResult.tracks.items[i].artists[0].name);
      }
    }



  // ------------------------------ Query 2 - Spotify - Use User's Spotify ID to collect their Playlis Names and IDs ------------------------------

  // Initialize array of Playlist Objects
  var userPlaylistObjects = [];

    function getUserPlaylistIDs(){

      // Empty out the array (if called another time)
      userPlaylistObjects = [];

        // AJAX Call to get the User's Playlists (using the Access Token)
        $.ajax({
          url: "https://api.spotify.com/v1/users/" + userSpotifyId + "/playlists",
          headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken
          }
        }).done(function(userPlaylistResponse){

            // Loop Through the Playlists and get the IDs
            for(var i = 0; i < userPlaylistResponse.items.length; i++){

              var newPlaylistObject = {
                name: userPlaylistResponse.items[i].name,
                playlistID: userPlaylistResponse.items[i].id
              };

              // Add Playlist IDs to array
              userPlaylistObjects.push(newPlaylistObject);
            }
              console.log(userPlaylistObjects);
        });
    }

function printUserPlaylists() {
  console.log("doing printUserPlaylists");
  for (var i = 0; i < userPlaylistObjects.length; i++) {
    console.log(userPlaylistObjects[i]);
    var a = $('<a>');
    a.attr({
      class: 'dropdown-button btn playlist-btn',
      href: '#',
      "data-activates": 'playlist-dropdown'+(i+1)
    });
    a.html(userPlaylistObjects[i].name)
    var ul = $('<ul>');
    ul.attr({
      id: 'playlist-dropdown'+(i+1),
      class: 'dropdown-content'
    });
    var li = $('<li>');
    var a2 = $('<a>');
    a2.attr({
      href: '#',
      playlistID: userPlaylistObjects[i].playlistID
    });
    a2.html('Song');
    $('#playlist-pane').append(a);
    $('#playlist-pane').append(ul.append(li.append(a2)));

  }

}





// ------------------------------ Query 3 - Spotify - Use Playlist ID to collect a Song Names / Artists / Album Art / Track IDs ------------------------------
// **NOTE THIS QUERY LIMIT IS 100, SO IF THE USER PLAYLIST IS >100 SONGS, NOT ALL WILL BE TAKEN

  // Initialize current playlist object
  var currentPlaylistSongObjects = [];

    function getUserPlaylistSongs(currentPlaylistID){
        
      // Empty out the object (if called another time)
      currentPlaylistSongObjects = [];

        // AJAX Call to get Selected Playlist's Songs and other info
          $.ajax({
            url: "https://api.spotify.com/v1/users/" + userSpotifyId + "/playlists/" + currentPlaylistID + "/tracks",
            headers: {
              'Authorization': 'Bearer ' + spotifyAccessToken
            }
          }).done(function(currentPlaylistResponse){
             
            // Loop Through the Playlists and get the IDs
            for(var i = 0; i < currentPlaylistResponse.items.length; i++){
              
              var newSongObject = {
                songName: currentPlaylistResponse.items[i].track.name,
                songID: currentPlaylistResponse.items[i].track.id,
                artistName: currentPlaylistResponse.items[i].track.artists[0].name,
                //albumCoverLink: currentPlaylistResponse.items[i].track.album.images[0].url
              };

              // Add Song Attributes Object to the PLay Array
              currentPlaylistSongObjects.push(newSongObject);
            }
              //console.log(currentPlaylistSongObjects)
    
          });
    }



// ------------------------------ Function to compare parent and child playlists and add the child to the parent ------------------------------
  var parentObject;
  var childObject;
  var songIDsToBeGivenToParent = [];

  function addChildtoParentPlaylist(parentPlaylistID, childPlaylistID){
    
    // Get a Parent Object
    getUserPlaylistSongs(parentPlaylistID);

    // Wait a second for the function to finish getting the Parent and then get the child
    setTimeout(function(){
      parentObject = currentPlaylistSongObjects;
      console.log(parentObject)

      // Get a Child Object
      getUserPlaylistSongs(childPlaylistID);

      // Wait a second for the function to finish
      setTimeout(function(){
        childObject = currentPlaylistSongObjects;
        console.log(childObject)

        // Compare the Child and Parent and add any new songs in the child into the parent
        setTimeout(function(){

          // Create an array of song IDs from the parent object (used by indexOf later)
          var parentArray = [];
          for(var k = 0; k < parentObject.length; k++){
            parentArray.push(parentObject[k].songID);
          }
          
          // Loop through child and compare against the parent values
          for(var i = 0; i < childObject.length; i++){
           
            // Test if current song in child belongs to anything in the parent, if no, then add it to the queue of songs to add
            if(parentArray.indexOf(childObject[i].songID) == -1){
              songIDsToBeGivenToParent.push(childObject[i].songID)
            }
            
          }

          // AJAX Call to update the user's parent playlist
          var addToParentPlaylistURL = "https://api.spotify.com/v1/users/" + userSpotifyId + "/playlists/" + parentPlaylistID + "/tracks/?" + "uris=";
            // Add all the songIDs to the ajax URL
            for(var i = 0; i < songIDsToBeGivenToParent.length; i++){
              addToParentPlaylistURL += "spotify:track:" + songIDsToBeGivenToParent[i] + ","
            }
            // Remove the last comma
            addToParentPlaylistURL = addToParentPlaylistURL.substring(0,addToParentPlaylistURL.length - 1);


            // Run AJAX Call to update Parent playlist
            $.ajax({
              method: "POST",
              url: addToParentPlaylistURL,
              headers: {
                'Authorization': 'Bearer ' + spotifyAccessToken
              }    
            });


        }, 1000); // end compare timer

      }, 1000); // end child timer

    }, 1000); // end parent timer
    


    

  }


// ============================================== MusixMatch API Queries ==============================================

  // Musix API Key
  var tomsMusixAPIkey = "1ff5234a0012c537709d815bfc88a85d";

  // ------------------------------ Query 3 - MusixMatch - Search for Track Id ------------------------------
    var musixTrackId;

    function queryMusixForId(artistName, trackName, albumName){

      // Scrub Input Data - Replace spaces with "%20"
      artistName = artistName.replace(/ /g, "%20").toLowerCase();
      trackName = trackName.replace(/ /g, "%20").toLowerCase();
      albumName.replace(/ /g, "%20").toLowerCase();

       // QUERY 1 - Run an initial search to identify the song's (track) unique Musix ID
      var queryMusixForIdURL = "https://crossorigin.me/" + "http://api.musixmatch.com/ws/1.1/" + "track.search?q_track=" + trackName + "&q_artist=" + artistName + "&q_album=" + albumName + "&f_has_lyrics=1" + "&format=json" + "&apikey=" + tomsMusixAPIkey;

      $.ajax({url: queryMusixForIdURL, method: 'GET'}).done(function(musixIdResponse) {

        // Response for Id query needed to be parsed
        musixIdResponse = JSON.parse(musixIdResponse);

        // Collect just the Musix Track Id
        musixTrackId = musixIdResponse.message.body.track_list[0].track.track_id;

        // Call the next AJAX call after this call is done
        queryMusixForLyrics(musixTrackId);

      });
    }

  // ------------------------------ Query 4 - MusixMatch - Find Lyrics using Track Id ------------------------------
    var musixLyrics; // just the lyrics
    var musixLyricsResult; // whole object

    function queryMusixForLyrics(){

      // QUERY 2 - Search with the Musix ID to get back Track Lyrics
      var queryMusixForLyricsURL = "https://crossorigin.me/" + "http://api.musixmatch.com/ws/1.1/" + "track.lyrics.get?track_id=" + musixTrackId + "&apikey=" + tomsMusixAPIkey;

      $.ajax({url:  queryMusixForLyricsURL, method: 'GET'}).done(function(musixLyricsResponse){

        // Response for Id query needed to be parsed
        musixLyricsResponse = JSON.parse(musixLyricsResponse);

        // Globally store the Lyrics Search Response
        musixLyricsResult = musixLyricsResponse;

        // Collect just the Musix Lyrics
        musixLyrics = musixLyricsResponse.message.body.lyrics.lyrics_body;

        // Remove the Non-Commerical Use message at the bottom of the lyrics
        musixLyrics = musixLyrics.replace("******* This Lyrics is NOT for Commercial use *******", "");

        // Remove the "\n" values 
        musixLyrics = musixLyrics.replace(/\n/g, " ");

        // Make the Lyrics into a string
        musixLyrics = JSON.stringify(musixLyrics);

        // Print lyrics to page and store as a variable in the object
        currentSong.lyrics = musixLyrics;
        printSong();
        printSongIframe();
        printPlaylistIframe();

      });
    }

// prints information into html
function printSong(){
  $('#title').html(currentSong.title);
  $('#album').html(currentSong.album);
  $('#album-img').attr('src', currentSong.albumImg);
  $('#artist').html(currentSong.artist);
  $('#lyrics').html(currentSong.lyrics);
}

// generates Spotify iframe for current song variable
function printSongIframe(){
  $('#iframe').empty();
  var iframe = $('<iframe>')
  iframe.attr({
    src: 'https://embed.spotify.com/?uri=spotify:track:'+currentSong.spotifyID,
    frameborder: '0',
    allowtransparency: 'true'
  });
  $('#iframe').append(iframe);
}

// generates Spotify iframe for playlist from user
function printPlaylistIframe(){
  var iframe = $('<iframe>')
  var playlist = '7JNPDieyce4ZZTBYlTGa6f';
  var user = 'spotify';
  iframe.attr({
    src: 'https://embed.spotify.com/?uri=spotify:user:'+user+':playlist:'+playlist,
    width: '300',
    height: '380',
    frameborder: '0',
    allowtransparency: 'true'
  });
  $('#iframe').append(iframe);
}

// fires function every time letter is typed into search
$('#search').keyup(function(e){

    search = $(this).val();

    // Only run query when key pressed is a letter (a = 65 and z = 90)
    if(e.keyCode >= 65 && e.keyCode <= 90){
      spotifySongSearch(search);
    }

});

// load ID from Spotify on click
var currentSong;
$('.dropdown-row').on('click', function(){
  var div = $(this);
  // set currentSong
  currentSong = {
    'title': div.children("[id*='song-title']").html(),
    'album': div.children("[id*='song-album']").html(),
    'albumImg': div.children("[id*='song-img']").attr('src'),
    'artist': div.children("[id*='song-artist']").html(),
    'spotifyID': div.data('spotifyID')
  };
  // call Musix function
  queryMusixForId(currentSong.artist,currentSong.title,currentSong.album);

});

$( "#show-playlists" ).on('click',function() {
  $( "#playlist-pane" ).empty();
  getUserPlaylistIDs();
  printUserPlaylists();
});

$( ".playlist-btn" ).on('click',function() {
  var holderID = $(this).data(spotifyID);
  $('.parent').data(playlistID);
  $('.parent').html(playlistID);
});




