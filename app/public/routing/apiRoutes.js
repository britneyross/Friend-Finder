var friends = require("../../data/friends");

function CompareFriends(scoresA, scoresB){
    // console.log(scoresA);
    // console.log(scoresB)
    var sum = 0;
    for (var i=0; i< scoresA.length; i++) {
        sum += Math.abs(scoresA[i]-scoresB[i]);
    }
    return sum;
}

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.send(friends).json();
    });

    app.post("/api/friends", function(req, res) {
        // console.log(req);
        // console.log(req.body);

        var scores = [];

        for (const property in req.body) {
            // console.log(`${property}: ${req.body[property]}`);
             scores.push(req.body[property]);
        }
        scores.splice(0,2);

        var newFriend = {
            name : req.body.name,
            photo : req.body.photo,
            scores : scores
        };


        // Comparison Logic
        var minDiff = 100;
        var match;

        for ( const property in friends){
            // console.log(friends[property]);
            var diff = CompareFriends(scores,friends[property].scores);
            // console.log(diff);
            if(diff < minDiff ){
                match = friends[property];
                minDiff = diff;
            }
        }

        // console.log(match);
        // console.log(minDiff);


        // console.log(newFriend);
        // console.log(friends);

        friends.push(newFriend);
        res.send(match).json();

    });



}