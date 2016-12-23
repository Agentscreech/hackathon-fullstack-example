var canvas = document.getElementById("gameboard");
var ctx = canvas.getContext("2d");
var randomX = 0;
var randomY = 0;
var targetSizes = createLevels(400);
var targetRange = 0;
var level = 0;
var targetValue = 100;
var score = 0;
var timeLimit = 30;
var accuracy = 0;
var scoreboard = $("#score");
var info = $("#info");
var interval = setInterval(timer, 1000);
$('#continue').hide();
$('#gameboard').click(targetClicked);


function drawTarget() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    randomX = Math.floor(Math.random() * 700);
    randomY = Math.floor(Math.random() * 500);
    targetRange = targetSizes[level] / 2;
    var img = new Image();
    img.src = "/img/target.svg"; //might have to change this later
    if (randomX + (targetSizes[level] + 10) > canvas.width) {
        randomX = canvas.width - (targetSizes[level]);
    }
    if (randomY + (targetSizes[level] + 10) > canvas.height) {
        randomY = canvas.height - (targetSizes[level]);
    }
    img.onload = start;

    function start() {
        ctx.drawImage(img, randomX, randomY, targetSizes[level], targetSizes[level]);
    }
}

function createLevels(startingWidth) {
    array = [];
    for (i = 1; i < 101; i++) {
        array.push(startingWidth * (1 / i));
    }
    return array;
}

function timer() {
  timeLimit -= 1;
  $('#timer').text("Time Remaining: "+timeLimit);
  if (timeLimit <= 0) {
    endGame();
  }
}



function targetClicked(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var dx = Math.abs(x - (randomX + targetRange));
    var dy = Math.abs(y - (randomY + targetRange));
    var r = Math.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)), 1);
    if (r > targetRange) {
        r = "you missed";
        endGame();
    } else {
        score += scoreTarget(r);
        scoreboard.text("Your Score is " + score);
        level++;
        drawTarget();
    }
}

function scoreTarget(distance) {
    var value = 0;
    if (distance === 0) {
        value = targetValue * 2;
        accuracy += 100;
        info.text("BULLSEYE!! DOUBLE POINTS");
    } else {
        value = targetValue - Math.round(((distance / targetRange) * 100), 1);
        accuracy += targetValue - Math.round(((distance / targetRange) * 100), 1);
        info.text("You scored " + value);
    }
    return value;
}

function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font="30px Arial";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER!",350,250);
    ctx.fillText("You hit " + level + " targets",350,350);
    ctx.fillText("Your final score is " + score,350,400);
    $('#gameboard').off("click");
    clearInterval(interval);
    $('#continue').show();
    $('#total').val(score);
    $('#level').val(level);
    $('#accuracy').val(Math.round(accuracy/level),1);
}

drawTarget();
