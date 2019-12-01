

//Require depedencies
var friends = require('../data/friends.js');

//ROutes 
module.exports = function(app) {

  // API GET REQUEST
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });


  // API POST Request
app.post('/api/friends', function(req, res) {

  //comparing user with their best buddy
  var totalDifference = 0;
  //obeject containing the best match variables
  var bestMatch = {
    name: "",
    photo: "",
    friendDifference: 1000
  };

  // Here we take the result of the users survey post and parse it
  var userData = req.body;
  var userName = userData.name;
  var userScores = userData.scores;
  // Convert the users scores to a number from a string
  var b = userScores.map(function(item) {
    return parseInt(item, 10);
  });
  userData = {
    "name": req.body.name,
    "photo": req.body.photo,
    "scores": b
  };
  console.log("Name: " + userName);
  console.log("User Score " + userScores);
  // COnverting the users score to a sum number 
  var sum = b.reduce((a, b) => a + b, 0);
  console.log("Sum of users score  " + sum);
  console.log("Best match friend diff " + bestMatch.friendDifference);


  console.log("-----------------------------------------------");

  // Iterate through friends in array
  for (var i = 0; i < friends.length; i++) {
    totalDifference = 0;
    console.log(friends[i].name);
    console.log("Best match friend diff " + bestMatch.friendDifference);

    var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
    console.log("Total friend score " + bfriendScore);
    totalDifference += Math.abs(sum - bfriendScore);
    console.log("---------> " + totalDifference);

    if (totalDifference <= bestMatch.friendDifference) {
      //RESET the best match to new friend
      bestMatch.name = friends[i].name;
      bestMatch.photo = friends[i].photo;
      bestMatch.friendDifference = totalDifference;
      // If someone runs the app a second time they wont get themselves
      if (bestMatch.name == userName) {
        bestMatch.name = "Phil Collins";
        bestMatch.photo = "https://pbs.twimg.com/media/ChEK6h4UoAAaS1r.jpg";
        bestMatch.friendDifference = 10;
      }


    }
    console.log(totalDifference + " Total Difference");


  }
  console.log(bestMatch);

  //Lastly save the users data to the database 
  friends.push(userData);
  console.log("New User added");
  console.log(userData);
  // Return JSON with the users best match. For use by html
res.json(bestMatch);
});
};