/*function polarityPlaylistSearch(){
  getUserPlaylistSongs("3ekUHhJ6QWQ6tM0KHO525Y")
   

   setTimeout(function(){
    console.log(currentPlaylistSongObjects)

    for(var i = 0; i < currentPlaylistSongObjects.length; i++){

      musixTrackId = "";

      var currentSongName = currentPlaylistSongObjects[i].songName;
      var currentArtistName = currentPlaylistSongObjects[i].artistName;

    
      var currentAlbumName = "";
      queryMusixForId(currentArtistName, currentSongName, "")
       

       /*break out after 5 sec to be safe*/
      //setTimeout(function(){ 
      //while(musixTrackId == ""){
        /*Do nothing*/
      //}
      //musixTrackId == "broken" 
    //}, 5000);


       //console.log(currentSongName)
  
  //}

   // }, 1000); // end compare timer

//}*/

//Running the playlist lyrics through the Text Gain API
var polarity;
var polarityResponse;
function polarityPlaylistSearch(){
  var queryURL = "https://api.textgain.com/1/sentiment/?q=" + musixLyrics;
  $.ajax({url: queryURL, method: 'GET'})
   .done(function(musicPolarityResponse){
     console.log(queryURL);
     console.log(musicPolarityResponse);

     //Globally store the polarity
     polarityResponse = polarity;

     //Collect the polarity and confidence
     polarity = musicPolarityResponse.polarity.confidence;

     //Initiate next AJAX call
     polarityPlaylistSearch(musixLyrics);
    });
}

//Running the current song through the Text Gain API
function currentSongPolarity(){
var queryURL = "https://api.textgain.com/1/sentiment/?q=" + musixLyrics;
  $.ajax({url: queryURL, method: 'GET'})
    .done(function(currentPolarity) {
      console.log(queryURL);
      console.log(currentPolarity); 

      //Globally store the polarity
      polarityResponse = polarity;

      //Collect the polarity and confidence
      polarity = musicPolarityResponse.polarity.confidence; 
    });  
} 


polarityPlaylistSearch();
currentSongPolarity();








