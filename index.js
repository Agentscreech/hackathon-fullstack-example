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
    // console.log(req.body);
    db.score.create(req.body).then(function(score){
        res.redirect('/archery-game?id='+score.id);
    });
});

//submit player scores
app.get ('/archery-game', function(req, res){
    var id = req.query.id;
    db.score.findAll().then(function(scores){
        res.render("game",{id: id});
    });
});

//show player results
app.get('/archery-game/scoreboard', function(req,res){
    db.score.findAll().then(function(scores){
      console.log("returned all scores");
      res.render('/scoreboard', {scores: scores});
    // res.render('scores/show');
    });
});


//admin panel
app.get('/scores', function(req,res){
    db.score.findAll().then(function(scores){
      console.log("returned all scores");
      res.render('scores/show', {scores: scores});
    // res.render('scores/show');
    });
});

//delete item
app.delete('/score/:id', function(req, res){
    console.log("trying to delete");
    var scoreToDelete = req.params.id;
    console.log("this "+ scoreToDelete);
    db.score.destroy({
          where: { id: scoreToDelete }
    }).then(function(scoreToDelete) {
        console.log("trying to redirect to /scores" );
        res.send();
      // do something when done deleting
    });
});




//listen
var port = 3000;
app.listen(port);
