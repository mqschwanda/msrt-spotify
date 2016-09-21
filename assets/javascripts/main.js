var search, returnSong, topResult, returnResult, songTitle, songAlbum, songAlbumImg, songArtist;

// function that calls Spotify API from search
function spotifyAPI() {
  //
  // place Spotify call function here
  //

  // flag for no result
  if (typeof(result) !== 'undefined') {
    // flag that a result has been returned
    returnResult = true;
  } else {
    returnResult = false;
  }
}

// updates search bar drop-down with top result
function setTopResult(){
  songTitle = "Song Title: topResult"; // Replace this with variables from the Spotify API object
  songAlbum = "Song Album: topResult"; // Replace this with variables from the Spotify API object
  songAlbumImg = "Song Album Img: topResult"; // Replace this with variables from the Spotify API object
  songArtist = "Song Artist: topResult"; // Replace this with variables from the Spotify API object
  // set topRestult
  topResult = {
    'title': songTitle,
    'album': songAlbum,
    'albumImg': songAlbumImg,
    'artist': songArtist
  };
  // reset flag
  returnSong = false;
}

function printTopResult(){
  // determine if there is a song to show or search should be shown
  if (returnSong === false) {
    $('#song-title').html("Song Title: " + search);
  } else {
    $('#song-title').html(topResult.title);
    $('#song-album').html(topResult.album);
    $('#album-img').attr('src', topResult.albumImg);
    $('#song-artist').html(topResult.artist);
  }
}

// print into Watson pane
function printWatson(){
  $('#watson-pane').html("I printed into the Watson pane");
}

// print into Spotify pane
function printSpotify(){
  $('#spotify-pane').html("I printed into the Spotify pane");
}

// on click for sign in button
$('#sign-in').on('click', function(){
});

// fires function every time letter is typed into search
$('#search').keyup(function(){
    search = $(this).val();
    spotifyAPI();
    setTopResult();
    printTopResult();
});

// change color of spyglass in search bar
$('#search').hover(function(){
    $('#spyglass').addClass('color-change');
    }, function(){
    $('#spyglass').removeClass('color-change');
});

