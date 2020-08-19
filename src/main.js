// 
var paddleLeft = document.getElementById('left-paddle');
var paddleRight = document.getElementById('right-paddle');
var ball = document.getElementById('ball');

var paddleLeftTop = 0;
var paddleRightTop = 0;
var paddleLeftHeight = 200;
var paddleRightHeight = 200;

var paddleRightDirection = 0;
var paddleRightTimer;

var paddleLeftDirection = 0;
var paddleLeftTimer;

paddleLeft.style.top = 0;
paddleRight.style.top = 0;

var ballXPos = 50;
var ballYPos = 50;
var ballXDir = 5;
var ballYDir = 5;
var ballWidth = 20;
var ballHeight = 20;

var leftScoreDisplay = document.getElementById('left-score');
var rightScoreDisplay = document.getElementById('right-score');
var leftScore = 0;
var rightScore = 0;

function updateScoreDisplay() {
    leftScoreDisplay.innerHTML = leftScore;
    rightScoreDisplay.innerHTML = rightScore;
}

function moveBall() {
    var newBallXPos = ballXPos + ballXDir;
    var newBallYPos = ballYPos + ballYDir;

    if (newBallXPos + ballWidth > window.innerWidth) {
        ballXDir = -Math.abs(ballXDir);
    }
    if (newBallYPos + ballHeight > window.innerHeight) {
        ballYDir = -Math.abs(ballYDir);
    }
    if (newBallXPos < 10) {
        ballXDir = Math.abs(ballXDir);
    }
    if (newBallYPos < 10) {
        ballYDir = Math.abs(ballYDir);
    }

    ballXPos += ballXDir;
    ballYPos += ballYDir;

    if (ballXPos < 30 &&
        (ballYPos + 30 < paddleLeftTop ||
            ballYPos > paddleLeftTop + paddleLeftHeight)) {
        rightScore += 1;
        updateScoreDisplay();
    }
    if (ballXPos + 30 > window.innerWidth - 30 &&
        (ballYPos + 30 < paddleRightTop ||
            ballYPos > paddleRightTop + paddleRightHeight)) {
        leftScore += 1;
        updateScoreDisplay();
    }
    ball.style.top = ballYPos + 'px';
    ball.style.left = ballXPos + 'px';
}

function moveRightPaddle() {
    paddleRightTop += paddleRightDirection;
    paddleRight.style.top = paddleRightTop + 'px';
}

function moveLeftPaddle() {
    paddleLeftTop += paddleLeftDirection;
    paddleLeft.style.top = paddleLeftTop + 'px';
}

setInterval(moveBall, 5);

setInterval(function() {
    if (ballXDir < 50) ballXDir *= 1.1;
    if (ballYDir < 50) ballYDir *= 1.1;
}, 10000)

document.addEventListener('keydown', function(evt) {
    switch (evt.code) {
        case 'ArrowDown':
            if (!paddleRightTimer) {
                paddleRightDirection = 10;
                paddleRightTimer = setInterval(moveRightPaddle, 10);
            }
            break;

        case 'ArrowUp':
            if (!paddleRightTimer) {
                paddleRightDirection = -10;
                paddleRightTimer = setInterval(moveRightPaddle, 10);
            }
            break;

        case 'KeyS':
            if (!paddleLeftTimer) {
                paddleLeftDirection = 10;
                paddleLeftTimer = setInterval(moveLeftPaddle, 10);
            }
            break;

        case 'KeyW':
            if (!paddleLeftTimer) {
                paddleLeftDirection = -10;
                paddleLeftTimer = setInterval(moveLeftPaddle, 10);
            }
            break;
    }
    console.log(evt);
})

document.addEventListener('keyup', function(evt) {
    switch (evt.code) {
        case 'ArrowDown':
        case 'ArrowUp':
            clearInterval(paddleRightTimer);
            paddleRightTimer = null;
            break;

        case 'KeyS':
        case 'KeyW':
            clearInterval(paddleLeftTimer);
            paddleLeftTimer = null;
            break;
    }
    console.log(evt);
})