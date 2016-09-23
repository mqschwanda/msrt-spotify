// ============================================== Spotify API Queries ==============================================

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

      });

    }

    function printTopResults() {
      // for each drop down result
      for (var i = 0; i < 5; i++) {
        var iPlus = i+1;
        $("#song-img"+iPlus).attr('src', spotifySongResult.tracks.items[i].album.images[0].url);
        $("#song-img"+iPlus).data('spotifyID', spotifySongResult.tracks.items[i].id);
        $("#song-title"+iPlus).html(spotifySongResult.tracks.items[i].name);
        $("#song-album"+iPlus).html(spotifySongResult.tracks.items[i].album.name);
        $("#song-artist"+iPlus).html(spotifySongResult.tracks.items[i].artists[0].name);
      }
    }

  // ------------------------------ Query 2 - Spotify - Use Song ID ** ONLY USED IF NEEDED IN THE FUTURE, OTHERWISE WE CAN REMOVE IT** ------------------------------
  // ************************** DELETE ME LATER - Start **************************
  // Example pass in from Main.js
  var input = "0ENSn4fwAbCGeFGVUbXEU3";
  spotifyIdSearch(input);
  // ************************** DELETE ME LATER - End **************************

  var spotifyIdResult;

  function spotifyIdSearch(songId){

    // Run a second call using the specific Spotify ID
    var queryURL2 = "https://api.spotify.com/v1/tracks/" + songId;

    $.ajax({url: queryURL2, method: 'GET'}).done(function(idResponse) {

      // Globally store the ID Search Response
      spotifyIdResult = idResponse;

    });
  }

// ============================================== MusixMatch API Queries ==============================================

  // Musix API Key
  var tomsMusixAPIkey = "1ff5234a0012c537709d815bfc88a85d";

  // ************************** DELETE ME LATER - Start **************************
  // Example pass in from Main.js
  var artistName1 = "Taylor Swift";
  var trackName1 = "Blank Space";
  var albumName1 = "1989";
  queryMusixForId(artistName1, trackName1, albumName1);
  // ************************** DELETE ME LATER - End **************************

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


        // console.log("Musix Lyrics Response: ")
        // console.log(musixLyricsResponse)
        // console.log("---------------------------------------------------")

        // Collect just the Musix Lyrics
        musixLyrics = musixLyricsResponse.message.body.lyrics.lyrics_body;

        // Remove the Non-Commerical Use message at the bottom of the lyrics
        musixLyrics = musixLyrics.replace("******* This Lyrics is NOT for Commercial use *******", "");

        // Remove the "\n" values 
        musixLyrics = musixLyrics.replace(/\n/g, " ");

        // Make the Lyrics into a string
        musixLyrics = JSON.stringify(musixLyrics);

        // console.log("Musix Lyrics (Note Only 30% are listed... good enough, right?: ")
        // console.log(musixLyrics)

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

// fires function every time letter is typed into search
$('#search').keyup(function(){
    search = $(this).val();
    // console.log(search);
    spotifySongSearch(search);
    printTopResults();
});

// load ID from Spotify on click
var currentSong;
$('.search-album-img').on('click', function(){
  var songId = $(this).data('spotifyID');
  var div = $(this).parent();
  // set currentSong
  currentSong = {
    'title': div.children("[id*='song-title']").html(),
    'album': div.children("[id*='song-album']").html(),
    'albumImg': div.children("[id*='song-img']").attr('src'),
    'artist': div.children("[id*='song-artist']").html(),
    'id': songId
  };
  // call Musix function
  queryMusixForId(currentSong.artist,currentSong.title,currentSong.album);
  // add lyrics to object
  currentSong.lyrics = musixLyrics;
  printSong();

});






