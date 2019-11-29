// Linking the routes to a series of data sources
// the data sources hold arrays of information on friend data

var friends = require("../app/friends.js");

// ROUTING

module.exports = function(app) {
  // API GET REQUEST RETURN DATA IN JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST REQUEST FOR DATA
// Infinity for no max difference
  app.post("/api/friends", function(req, res) {
    
    //Comparing users for best match
    var totalDifference = 0;

    //OBJECT for best match parametershttps://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiDsYGM843mAhUsWN8KHTfRBoMQjRx6BAgBEAQ&url=https%3A%2F%2Fscreenrant.com%2Ftrailer-park-boys-main-characters-details%2F&psig=AOvVaw3tfCGMuxSD62BwSahjjWcK&ust=1575064608731684
var bestMatch = {
  name: "",
  photo: "",
  friendDifference: Infinity
};

//Take user survey post and parse data
   var userData = req.body;
   var userName = userData.name;
   var userScores = userData.scores;

   //convert user score to a number
   var b = userScores.map(function(item) {
     return parseInt(item, 10);
   });

   //Object for user data
   userData = {
     "name": req.body.name,
     "photo": req.body.photo,
     "scores": b
   };

   console.log("Name: " + userName);
   console.log("User Score " + userScores);

   // convert the user scores to a number by adding all numbers in array
   var sum = b.reduce((a, b) => a + b, 0);
   console.log("Sum of users score " + sum);
   console.log("Best match friend diff " + bestMatch.friendDifference);


   console.log("-----------------------------");

   // Iterate through for loop to consider all friend possibilities from database.
   for (var i = 0; i < friends.length; i++) {
     totalDifference = 0;
     console.log(friends[i].name);
     console.log("Best match friend diff " + bestMatch.friendDifference);

     var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0); 
     console.log("Total friend score " + bfriendScore);
     totalDifference += Math.abs(sum - bfriendScore);
     console.log("-----------> " totalDifference);

     // If the sum of differences is less then the differences of the current "best match"
     // We are looking for the smallest difference (most similar) peoples interests
     if (totalDifference <= bestMatch.friendDifference) {
       // Reset the bestMatch to the new friend
       bestMatch.name = friends[i].name;
       bestMatch.photo = friends[i].photo;
       bestMatch.friendDifference = totalDifference;
       // If someone runs the application a second time they wont get themselves 
       if (bestMatch.name == userName) {
         bestMatch.name = "Phil Collins";
         bestMatch.photo = "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiDsYGM843mAhUsWN8KHTfRBoMQjRx6BAgBEAQ&url=https%3A%2F%2Fscreenrant.com%2Ftrailer-park-boys-main-characters-details%2F&psig=AOvVaw3tfCGMuxSD62BwSahjjWcK&ust=1575064608731684";
         bestMatch.friendDifference = 10;
       }
     }
     console.log(totalDifference + " Total Difference");

   }
   console.log(bestMatch);

  // Finally save the users data to the database (this has to happen after the check.)
   friends.push(userData);
   console.log("New user added");
   console.log(userData);
   //Return JSON

      //Use for loop to iterate through current friend score list and store in currentFriendScore variable
      for (var p = 0; p < currentFriend.scores.length; p++) {
        var currentFriendScore = currentFriend.scores[p];
        var currentUserScore = userScores[p];
        // Measure total difference in user scores with absolute number
        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentFriendScore)
        );
      }
      // Set determining factors in if statement to decide if best match
      if (totalDifference <= bestMatch.friendsDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    // push friends data
    friends.push(userData);
    // Join data for best match 
    res.join(bestMatch);

  });
};
