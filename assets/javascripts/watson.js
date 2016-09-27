function displayEmotion(){
var queryURL = "https://api.textgain.com/1/sentiment/?q=" + musixLyrics;
  $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
      console.log(queryURL);
      console.log(response);  
   if(response.polarity === -1) {
    $('#watson-pane').html("Negative")
   } 
   if(response.polarity === 0) {
    $('#watson-pane').html("Neutral")
   }
   if(response.polarity === 1) {
    $('#watson.pane').html("Positive")
   }
    });
};