#MSRT

Project Outline:
  Roles:
    -Frontend: Stacy Trent
    -Backend: Mark Schwanda
    -Spotify API: Thomas Thompson
    -Watson API: Ryan Seery

  Must uses at least two APIs
    -IMB Watson, wikipedia, Spotify
  Must utilize at least one new library or technology that we haven't discussed:
    -Analytics of app use
  Must have User Input Validation:
    -check Spotify database for song to validate search.
  Must use Bootstrap or Alternative CSS Framework:
    -Materialize
  Must have a polished frontend / UI:
    -match Spotify design as best as possible

  High Level:
    -A web app that allows the user to play their Spotify playlist and read about the tone and personality insights about the song/playlist using the IBM Watson API. 

  App steps:
    -Sign in to Spotify
    -Input song via search bar
    -Pull json data from Spotify api
    -Translate lyrics to send to IBM
    -Send lyrics to IBM
    -Pull json data from IBM
    -Show data to user

  Extra (after main goals are accomplished):
    -Translate data for use with Spotify API
    -Generate dynamic Spotify playlists and recommendations