var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/weresquirrelduels');

var colonies = db.get('colonies');
var wereSquirrels = db.get('wereSquirrels');
var uniBears = db.get('uniBears');
var wereSquirrelsContract = db.get('wereSquirrelsContract');
var uniBearsContract = db.get('uniBearsContract');
var duels = db.get('duels');
var duelStats = db.get('duelStats');

/* GET home page. */
router.get('/', function(req, res, next) {
  //add wins
  var colonyArray = [];
  var duelPromiseArray = [];
  colonies.find({}).then(function(data){
    for (var i = 0; i < data.length; i++){
      colonyArray.push({name: data[i].name, _id: data[i]._id});
      duelPromiseArray.push(duels.find({winner: data[i].name}));
    };
    Promise.all(duelPromiseArray).then(function(data){
      for (var i = 0; i < data.length; i++){
        if(colonyArray[i].wins){
          colonyArray[i].wins += data[i].length;
        } else {
          colonyArray[i].wins = data[i].length;
        }
      }

      res.render('index', { colonies: colonyArray}); 
    })

   
  });  
});

router.get('/colonies/:id', function(req, res, next) {
  // build an array OF OBJECTS to accumulate all of the Squirrels.
  colonies.findOne({_id: req.params.id}).then(function(data){
    var squirrelsArray, bearsArray
    var colonyName = data.name;
    var squirrelsDataArray = [];
    Promise.all([
      wereSquirrelsContract.findOne({colony: data._id}),
      uniBearsContract.findOne({colony: data._id})
      ]).then(function(data){
        Promise.all([
          wereSquirrels.find({contract: data[0]._id}),
          uniBears.find({contract: data[1]._id})
          ]).then(function(data){
            squirrelsArray = data[0];
            bearsArray = data[1];

            var squirrelPromises = []
            for (var i = 0; i < squirrelsArray.length; i++){
              squirrelsDataArray.push({name: squirrelsArray[i].name, id: squirrelsArray[i]._id})
              squirrelPromises.push(duelStats.find({wereSquirrel: squirrelsArray[i]._id}))
            }
            Promise.all(squirrelPromises).then(function(data){
              for(var i = 0; i < data.length; i++){
                for (var j = 0; j < data[i].length; j++){
                  if (squirrelsDataArray[i].meatTotal){
                    squirrelsDataArray[i].meatTotal += data[i][j].meat;
                  } else {
                    squirrelsDataArray[i].meatTotal = data[i][j].meat;
                  }
                  if (squirrelsDataArray[i].garlicTotal){
                    squirrelsDataArray[i].garlicTotal += data[i][j].garlic;
                  } else {
                    squirrelsDataArray[i].garlicTotal = data[i][j].garlic;
                  }
                  squirrelsDataArray[i].meat = data[i][j].meat;
                  squirrelsDataArray[i].garlic = data[i][j].garlic;

                }  
              }
              // console.log(squirrelsDataArray)
              res.render('colony', {colony: colonyName, bears: bearsArray, totals: squirrelsDataArray})
            })
          })
      })
  })
})

router.get('/duel', function(req, res, next){
  colonies.find({}).then(function(data){
    res.render('duel', {colonies: data});
  })
})

router.post('/duel', function(req, res, next){
  if (req.body.team1 === req.body.team2){
    var error = 'Please pick two DIFFERENT teams.';
    colonies.find({}).then(function(data){
      res.render('duel', {error: error, colonies: data})
    })
  }
  var team1 = req.body.team1;
  var team2 = req.body.team2;

  var outputObject = {team1: team1, team2: team2, squirrels: []};
  var coloniesArray = [
    colonies.findOne({name: team1}),
    colonies.findOne({name: team2})]
  Promise.all(coloniesArray).then(function (colonies){
    var contractArray = [];
    for (var i = 0; i < colonies.length; i++){
      contractArray.push(wereSquirrelsContract.findOne({colony: colonies[i]._id}))
    }
    Promise.all(contractArray).then(function (contracts){
      var squirrelArray = [];
      for (var i = 0; i < contracts.length; i++){
        squirrelArray.push(wereSquirrels.find({contract: contracts[i]._id}))
      }
      Promise.all(squirrelArray).then(function (squirrelsData){
        for (var i = 0; i < squirrelsData.length; i++){
          outputObject.squirrels.push(squirrelsData[i]);
        }
        function random() {
          return Math.floor(Math.random() * (10 + 1));
        }
        var total1 = 0;
        var total2 = 0;
        for (var i = 0; i < outputObject.squirrels.length; i++){
          for (var j = 0; j < outputObject.squirrels[i].length; j++){
            outputObject.squirrels[i][j].meatRate = random();
            outputObject.squirrels[i][j].garlicRate = random();
            if (i === 0){
              outputObject.squirrels[i][j].team = team1;
              total1 += (outputObject.squirrels[i][j].meatRate + outputObject.squirrels[i][j].garlicRate)
            } else {
              outputObject.squirrels[i][j].team = team2;
              total2 += (outputObject.squirrels[i][j].meatRate + outputObject.squirrels[i][j].garlicRate)
            }
          }
        }
        if (total1 > total2){
          outputObject.winner = team1;
        } else {
          outputObject.winner = team2;
        }
        // insert to duels, duel stats
        duels.insert({colony1: team1, colony2: team2, winner: outputObject.winner}).then(function(data){
          console.log(data)
        res.render('results', {output: outputObject})
        })
        
        

      })
    })
  })
})

module.exports = router;
