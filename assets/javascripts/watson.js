function displayEmotion(){
  var queryURL = "https://api.textgain.com/1/sentiment/?q=" + lyrics;
  $.ajax({url: queryURL, method: 'GET'})
  .done(function(response) {
    console.log(queryURL);
    console.log(response);
  })
}

