// Linking the routes to a series of data sources
// the data sources hold arrays of information on friend data

var friends = require("../data/friends.js");
console.log("apiRoutes.js is linked");
console.log("friends is ");
console.log(friends);
// ROUTING

module.exports = function(app) {
  // API GET REQUEST RETURN DATA IN JSON
  app.get("/api/friends/", function(req, res) {
    res.json(friends);
  });

  // API POST REQUEST FOR DATA
app.post("/api/friends/", function(req, res) {
  
  var userData = req.body

  console.log("userData is ");
  console.log(userData);

  for(var i=0; i<10; i++) {
    userData.scores[i] = parseInt(userData.scores[i]);
  }

  console.log("friends[0].scores is " );
  console.log("friends[0].scores");
  console.log("\n ------------- \n");

  console.log("userData.scores is ");
  console.log("userData.scores");

  var totalDifference = [];

  for (var i=0; i<friends.length; i++) {
    totalDifference[i] = 0;
  }

  console.log("Total difference is ");
  console.log(totalDifference);

  console.log("userData.scores.length is ");
  console.log(userData.score.length);

  for (var i=0; i<friends.length; i++){
    for(var j=0; j<userData.scores.length; j++){
      totalDifference[i]+= Math.abs((friends[i].scores[j] - userData.scores[j]));
    }
    console.log("totalDifference[" + i + "] is ");
    console.log(totalDifference[i]);
  }

  console.log("totalDifference is ");
  console.log(totalDifference);



  var minValue = totalDifference.indexOf(Math.min.apply(null,totalDifference));

  console.log("minValue is " + minValue);

  var bestMatch = friends[minValue];

  // console.log("Best match: ");
  // console.log(bestMatch);

  res.json(bestMatch);


});

}
