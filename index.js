// requires
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');


//global vars
var app = express();
var db = require('./models');
//set/user
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

//routes
//get home page
app.get("/", function(req,res) {
    res.render("home");
});


//submit new player
app.post('/archery-game/new', function(req,res){
    db.score.create(req.body).then(function(score){
        res.redirect('/archery-game?id='+score.id);
    });
});

//run game
app.get ('/archery-game', function(req, res){
    var id = req.query.id;
    db.score.findAll().then(function(scores){
        res.render("game",{id: id});
    });
});

//submit player scores
app.put('/archery-game/score', function(req, res) {
  var points = req.body.points;
  var level = req.body.level;
  var accuracy = req.body.accuracy;
  var id = req.body.id;
      db.score.update(
        {points: points,level: level,accuracy: accuracy}, {where: {id: id}
      }).then(function(user) {
      });

  res.send({message: 'success'});
});


//show player results
app.get('/archery-game/scoreboard', function(req,res){
    db.score.findAll().then(function(scores){
      var playerScore = scores[scores.length-1];
      var highscores = scores;
      var averageScore = getAveScore(scores);
      highscores.sort(function(a,b){
        return -(a.points - b.points);
      });
      res.render('scoreboard', {playerScore: playerScore,highscores: highscores,averageScore: averageScore});
    });
});


//admin panel
app.get('/admin-panel', function(req,res){
    db.score.findAll().then(function(scores){
      res.render('admin', {scores: scores});
    });
});

//admin edit display
app.get('/admin-panel/edit/:id', function(req, res){
    db.score.findById(req.params.id).then(function(score){
          res.render('editScore', {score: score});
      });
});

//admin submit edit /admin-panel/edit/<%= score.id %>
app.put('/admin-panel/:id', function(req, res) {
  var points = req.body.points;
  var level = req.body.level;
  var accuracy = req.body.accuracy;
  var name = req.body.name;
  var id = req.params.id;
      db.score.update(
        {points: points,level: level,accuracy: accuracy}, {where: {id: id}
      }).then(function(user) {
      });

  res.send({message: 'success'});
});

//delete item
app.delete('/score/:id', function(req, res){
    var scoreToDelete = req.params.id;
    db.score.destroy({
          where: { id: scoreToDelete }
    }).then(function(scoreToDelete) {
        res.send();
      // do something when done deleting
    });
});


function getAveScore(scores){
  sumPoints = 0;
  sumLevel = 0;
  sumAccuracy = 0;
  var averages = {points:0,level:0,accuracy:0};
  for (i = 0; i<scores.length; i++ ){
    sumPoints += scores[i].points;
    sumLevel += scores[i].level;
    sumAccuracy += scores[i].accuracy;
  }
  averages.points = sumPoints/scores.length;
  averages.level = sumLevel/scores.length;
  averages.accuracy = sumAccuracy/scores.length;
  return averages;
}



//listen
var port = 3000;
app.listen(port);
