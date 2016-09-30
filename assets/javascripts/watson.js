var songLyricsForWatson = [];
var watsonQuery = false;

function polarityPlaylistSearch(playlistIDforWatson){

  // Resets in case it is called more than 1 time...
  watsonQuery = true;
  songLyricsForWatson = [];
  
  // AJAX call in Spotify that uses "async: false" to wait until its done to proceed
  getUserPlaylistSongs(playlistIDforWatson);

  // Loop through all the songs and get their lyrics
  for(var j = 0; j < currentPlaylistSongObjects.length; j++){

    var currentSongName = currentPlaylistSongObjects[j].songName;
    var currentArtistName = currentPlaylistSongObjects[j].artistName;

    // AJAX calls in Musix that use "async: false" to wait until done to proceed
    queryMusixForId(currentArtistName, currentSongName, "");

    // Push current song lyrics to Watson list (musixLyrics is global at each increment of j)
    songLyricsForWatson.push(musixLyrics);
  }

  // Resets in case it is called more than 1 time...
  watsonQuery = false;

  console.log(songLyricsForWatson)
}


// rest assured the code works though, if u cant get a result here, then comment out line 33 and use the below array as a data sample to make your emotion calls
// again the key for the AJAX to wait is... "$.ajax({url:  queryURL, async : false, method: 'GET'}).done(function(response){" ... use that for ur call to the other API
sampleWatsonLyricsResult = ["See me comin' to town with my soul Straight down …s Broke down out in a ditch of old rubbish ...  ", "I heard sirens in my head From the first time tha…opes up Cause then I'll never get let down ...  ", "So if you're lonely, you know I'm here waiting fo…You don't know You say, you don't go ...  ", "Giddy up, giddy it up Giddy up, giddy up  Wanna m…our life Live it once, can't live it twice ...  ", "I've been alone with you inside my mind And in my… what to do And I want to tell you so much ...  "];
//console.log(sampleWatsonLyricsResult)

//Running song lyrics from playlist through sentimood.js
function getCurrentSongSentimood(songLyrics){
  for (var i = 0; i < songLyrics.length; i++){


    var sentiment = new Sentimood();
    var currentSongLyric = songLyrics[i];

    var currentSongLyricSentiment = sentiment.analyze(currentSongLyric);

    currentSongSentimentTotal += currentSongLyricsSentiment.score;
  }  
    var currentSongSentimentValue = currentSongSentimentTotal/songlyrics.length;

    var currentSongSentiment;

      if(currentSongSentimentValue >= -0.5 && currentSongSentimentValue <= 0.5){
        currentSongSentiment = "Content";
     
      }

      else if (currentSongSentimentValue < -0.5  && currentSongSentimentValue > -3.5){
        currentSongSentiment = "Sad";

      }

      else if(currentSongSentimentValue <= -3.5 && currentSongSentimentValue > -7){
      currentSongSentiment = "Bummer";

      }

      else if(currentSongSentimentValue <= -7){
        currentSongSentiment = "Are you OK?";

      }

      else if(currentSongSentimentValue > 0.5 && currentSongSentimentValue < 3.5){
        currentSongSentiment = "Chill";

      }

      else if(currentSongSentimentValue >= 3.5 && currentSongSentimentValue < 7){
        currentSongSentiment = "Happy";
      
      }

      else if(currentSongSentimentValue >= 7){
        currentSongSentiment = "Ecstatic!";

      }

      else{
        currentSongSentiment = "Unknown";
      }


};


getCurrentSongSentimood();
//console.log(currentSongLyric)
//console.log(currentSongLyricSentiment)

function getPlaylistSentimood(songLyricsForWatson){

  var playlistSentimentTotal = 0;

  // iternate over playlist lyrics and sum all mood values
  for(var i = 0; i < songLyricsForWatson.length; i ++){

    var sentiment = new Sentimood();
    var currentPlaylistLyric = songLyricsForWatson[i];

    var currentPlaylistLyricSentiment = sentiment.analyze(currentPlaylistLyric);

    playlistSentimentTotal += currentPlaylistLyricSentiment.score;
  }

  // divide total by songs for an average mood
  var playlistSentimentValue = playlistSentimentTotal/songLyricsForWatson.length;

  // Initialize a written mood strig;
  var playlistSentiment;


    if(playlistSentimentValue >= -0.5 && playlistSentimentValue <= 0.5){
      playlistSentiment = "Content";
     
    }

    else if (playlistSentimentValue < -0.5  && playlistSentimentValue > -3.5){
      playlistSentiment = "Sad";

    }

    else if(playlistSentimentValue <= -3.5 && playlistSentimentValue > -7){
     playlistSentiment = "Bummer";

    }

    else if(playlistSentimentValue <= -7){
      playlistSentiment = "Are you OK?";

    }

    else if(playlistSentimentValue > 0.5 && playlistSentimentValue < 3.5){
      playlistSentiment = "Chill";

    }

    else if(playlistSentimentValue >= 3.5 && playlistSentimentValue < 7){
      playlistSentiment = "Happy";
      
    }

    else if(playlistSentimentValue >= 7){
       playlistSentiment = "Ecstatic!";

    }

    else{
      playlistSentiment = "Unknown";
    }


    $('#spotify-pane').html(playlistSentiment);
    // $(currentPlaylistLyricSentiment).attr(currentPlaylistLyric)
}

getPlaylistSentimood(sampleWatsonLyricsResult);

///////////////////////////////////////////////////////////////////////////////////
var currentPlaylistSentiment;

var avgPlaylistRythmicMood = 0;
var avgPlaylistEnergy = 0;
var avgPlaylistDancebility = 0;

function songFeaturesSearch(playlistIDforWatson){

 // Initialize arrays
 var playlistRythmicMoodArray = [];
 var playlistEnergyArray = [];
 var playlistDanceabilityArray = [];

 // Initialize ID list for URL
 var listOfSongFeatureIDs = "";

 // Loop through all the songs and get their ids
 for(var j = 0; j < currentPlaylistSongObjects.length; j++){

  var currentSongID = currentPlaylistSongObjects[j].songID;
  currentSongID = currentSongID + ",";

  listOfSongFeatureIDs += currentSongID;

 }

 // Remove last comma
 listOfSongFeatureIDs = listOfSongFeatureIDs.substring(0, listOfSongFeatureIDs.length - 1);

 // Get Audio Features from Spotify API Query
 var featuresURL = "https://api.spotify.com/v1/audio-features/?ids=" + listOfSongFeatureIDs;

     $.ajax({
       url: featuresURL,
       headers: {
         'Authorization': 'Bearer ' + spotifyAccessToken
       }
     }).done(function(userPlaylistFeaturesResponse){
       
       for(var k = 0; k < userPlaylistFeaturesResponse.audio_features.length; k++){

         // Collect the features of each song
         var currentSongRythmicMood = userPlaylistFeaturesResponse.audio_features[k].valence*10; // set on a 0 to 10 scale
         var currentSongEnergy = userPlaylistFeaturesResponse.audio_features[k].energy*10; // set on a 0 to 10 scale
         var currentSongDanceability = userPlaylistFeaturesResponse.audio_features[k].danceability*10; // set on a 0 to 10 scale
         
         // Push to the arrays (in case needed in the global scope)
         playlistRythmicMoodArray.push(currentSongRythmicMood);
         playlistEnergyArray.push(currentSongEnergy);
         playlistDanceabilityArray.push(currentSongDanceability);

         // Sum for the average value
         avgPlaylistRythmicMood += currentSongRythmicMood;
         avgPlaylistEnergy += currentSongEnergy;
         avgPlaylistDancebility += currentSongDanceability;

       }

       // Divide the sums for an average
       avgPlaylistRythmicMood = (avgPlaylistRythmicMood/playlistRythmicMoodArray.length).toPrecision(2);
       avgPlaylistEnergy = (avgPlaylistEnergy/playlistEnergyArray.length).toPrecision(2);
       avgPlaylistDancebility = (avgPlaylistDancebility/playlistDanceabilityArray.length).toPrecision(2);



       // Get Text Result for Rythmic Mood
       avgPlaylistRythmicMood = parseInt(avgPlaylistRythmicMood);

       if(avgPlaylistRythmicMood >= 4.5 && avgPlaylistRythmicMood <= 5.5){
         currentPlaylistSentiment = "Content";
    
       }

       else if (avgPlaylistRythmicMood > 3  && avgPlaylistRythmicMood < 4.5){
         currentPlaylistSentiment = "Sad";

       }

       else if(avgPlaylistRythmicMood >= 1.5 && avgPlaylistRythmicMood <= 3){
         currentPlaylistSentiment = "Bummer";

       }

       else if(avgPlaylistRythmicMood <= 1.5){
         currentPlaylistSentiment = "Are you OK?";

       }

       else if(avgPlaylistRythmicMood > 5.5 && avgPlaylistRythmicMood < 7){
         currentPlaylistSentiment = "Chill";

       }

       else if(avgPlaylistRythmicMood >= 7 && avgPlaylistRythmicMood < 8.5){
         currentPlaylistSentiment = "Happy";
       
       }

       else if(avgPlaylistRythmicMood >= 8.5){
         currentPlaylistSentiment = "Ecstatic!";

       }

       else{
         currentPlaylistSentiment = "Unknown";
       }      

     });

}

function appendToDom(){
  $('#spotify-pane').empty();

  
  var p_lyricSent = $("<p>");
  var p_musicSent = $("<p>");
  var P_showScale = $("<p>");
  var p_energy = $("<p>");
  var p_dance = $("<p>");


  p_lyricSent.html("Lyrical Mood: " + playlistSentiment);
  p_musicSent.html("Rhythmic Mood: " + currentPlaylistSentiment);
  P_showScale.html("On a scale of 0 (low) to 10 (high)...");
  p_energy.html("Energy Level: " + avgPlaylistEnergy);
  p_dance.html("Dancebility: " + avgPlaylistDancebility);

  $('#spotify-pane').append(p_lyricSent);
  $('#spotify-pane').append(p_musicSent);
  $('#spotify-pane').append(P_showScale);
  $('#spotify-pane').append(p_energy);
  $('#spotify-pane').append(p_dance);
}

appendToDom();
      



