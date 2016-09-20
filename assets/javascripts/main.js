var search;

// function that calls Spotify API from search
function spotifyAPI() {
  console.log(search);
}

// updates search bar drop-down with top result
function topResult(){
  var topResult = search;
  $('#top-result').html(topResult);
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
    topResult();
});

// change color of spyglass in search bar
$('#search').hover(function(){
    $('#spyglass').addClass('color-change');
    }, function(){
    $('#spyglass').removeClass('color-change');
});

