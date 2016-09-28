function displayEmotion(){
var queryURL = "https://api.textgain.com/1/sentiment/?q=" + musixLyrics;
  $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
      console.log(queryURL);
      console.log(response);  
   if(response.polarity === -1) {
    localstorage.setItem('negative', '-1')
   } 
   else(response.polarity === 0) {
    localstorage.setItem('neutral', '0')
   }
   else(response.polarity === 1) {
    localstorage.setItem('positive', '1')
   }
    });
};

function polarityPlaylistSearch(){
  var song = playlist.JSON.stringify();
  var queryURL = "https://api.textgain.com/1/sentiment/?q=" + song;
  $.ajax({url: queryURL, method: 'GET'})
  .done(function(response){
    console.log(queryURL);
    console.log(response);
    if(response.polarity === 1) {
      localstorage.setItem('postive', '1');
    }
    else(rating === 0) {
      localstorage.setItem('neutral', '0');
    }
    else(rating === -1) {
      localstorage.setItem('negative', '-1');
    }

    }
  });
}

function recommendPlaylist(){

}






