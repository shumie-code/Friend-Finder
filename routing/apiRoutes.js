// Linking the routes to a series of data sources
// the data sources hold arrays of information on friend data

var friendData = require("../app/friends");

// ROUTING

module.exports = function(app) {
  // API GET REQUEST RETURN DATA IN JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST REQUEST FOR DATA

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    //Create variables to store user data and iterate through friend list to compare current friend scores
    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference = 0;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      //
      for (var p = 0; p < currentFriend.scores.length; p++) {
        var currentFriendScore = currentFriend.scores[p];
        var currentUserScore = userScores[p];

        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentFriendScore)
        );
      }

      if (totalDifference <= bestMatch.friendsDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    
  });
};
