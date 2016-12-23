var randomX = 0;
var randomY = 0;
var targetSizes = createLevels(400);
var canvas = document.getElementById("gameboard");
var ctx = canvas.getContext("2d");
var targetRange = 0;
var level = 0;
var targetValue = 100;
var score = 0;
var timeLimit = 60;
var scoreboard = document.getElementById("score");
var info = document.getElementById("info");


function drawTarget() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    randomX = Math.floor(Math.random() * 700);
    randomY = Math.floor(Math.random() * 500);
    targetRange = targetSizes[level] / 2;
    var img = new Image();
    img.src = "target.svg";
    if (randomX + (targetSizes[level] + 10) > canvas.width) {
        // console.log(randomX + " is too big on x");
        randomX = canvas.width - (targetSizes[level]);
    }
    if (randomY + (targetSizes[level] + 10) > canvas.height) {
        // console.log(randomY + " is too big on y");
        randomY = canvas.height - (targetSizes[level]);
    }
    img.onload = start;

    function start() {
        // console.log("center is (" + (randomX + targetRange) + "," + (randomY + targetRange) + ")");
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




function targetClicked(e) {
    var x = e.clientX - 9;
    var y = e.clientY - 9;
    var dx = Math.abs(x - (randomX + targetRange));
    var dy = Math.abs(y - (randomY + targetRange));
    var r = Math.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)), 1);
    if (r > targetRange) {
        r = "you missed";
        endGame();
    } else {
        score += scoreTarget(r);
        scoreboard.textContent = "Your Score is " + score;
    }
    level++;
    drawTarget();
}

function scoreTarget(distance) {
    var value = 0;
    if (distance === 0) {
        value = targetValue * 2;
        info.textContent = "BULLSEYE!! DOUBLE POINTS";
    } else {
        value = targetValue - Math.round(((distance / targetRange) * 100), 1);
        info.textContent = "You scored " + value;
    }
    return value;
}

function endGame() {
//test
}

drawTarget();
