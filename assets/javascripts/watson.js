var submitData = function() {
  var queryURL = "https://gateway-a.watsonplatform.net/calls/language/text/docEmotions?";
  var apiKey = "29bb9e2d19bf36190a39c530fbfdfdeaf5a425d2";
  queryURL = queryURL+"apiKey"+apiKey;
  var inputText = $('#spotify-pane').val();
  queryURL = queryURL+"&text=" + encodedURIComponent(inputText);
  queryURL = queryURL + "&outputMode=json";
  console.log(queryURL);

  $.ajax({
    url: queryURL
    method: 'GET',
    .done(function(response) {
      console.log(queryURL);
      console.log(response);
      $('#spotify-pane').html(response);
    });
}