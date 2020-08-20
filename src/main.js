const leftGoalkeeper = document.querySelector(".left-goalkeeper");
const rightGoalkeeper = document.querySelector(".right-goalkeeper");
const ball = document.querySelector(".ball");

let positionLeftGK = window.innerHeight / 2;
let positionRightGK = window.innerHeight / 2;
let stepLeftGK = 0;
let stepRightGK = 0;

document.onkeydown = function(event) {
    switch (event.code) {
        case "KeyW":
            stepLeftGK = -1;
            break;
        case "KeyS":
            stepLeftGK = 1;
            break;
        case "ArrowUp":
            stepRightGK = -1;
            break;
        case "ArrowDown":
            stepRightGK = 1;
            break;
    }
};

document.onkeyup = function(event) {
    switch (event.code) {
        case "KeyW":
            stepLeftGK = 0;
            break;
        case "KeyS":
            stepLeftGK = 0;
            break;
        case "ArrowUp":
            stepRightGK = 0;
            break;
        case "ArrowDown":
            stepRightGK = 0;
            break;
    }
};

function goalkeepersPositions() {
    const minPosition = leftGoalkeeper.offsetHeight / 2;
    const maxPosition = window.innerHeight - minPosition;

    if (stepLeftGK !== 0) {
        positionLeftGK = positionLeftGK + stepLeftGK * 5;

        if (positionLeftGK < minPosition) {
            positionLeftGK = minPosition;
        } else if (positionLeftGK > maxPosition) {
            positionLeftGK = maxPosition;
        }

        leftGoalkeeper.style.top = positionLeftGK + "px";
    }

    if (stepRightGK !== 0) {
        positionRightGK = positionRightGK + stepRightGK * 5;

        if (positionRightGK < minPosition) {
            positionRightGK = minPosition;
        } else if (positionRightGK > maxPosition) {
            positionRightGK = maxPosition;
        }

        rightGoalkeeper.style.top = positionRightGK + "px";
    }
}

setInterval(goalkeepersPositions, 1000/60);

let positionBallX = window.innerWidth / 2;
let positionBallY = window.innerHeight / 2;
let moveBallX = 5;
let moveBallY = 5;

function ballPosition() {
    if (positionBallX >= window.innerWidth - ball.offsetWidth / 2
        || positionBallX <= ball.offsetWidth / 2) {
            moveBallX = moveBallX * -1;
    }

    if (positionBallY >= window.innerHeight - ball.offsetHeight / 2
        || positionBallY <= ball.offsetHeight / 2) {
            moveBallY = moveBallY * -1;
    }

    positionBallY = positionBallY + moveBallY;
    positionBallX = positionBallX + moveBallX;

    ball.style.left = positionBallX + "px";
    ball.style.top = positionBallY + "px";
}

setInterval(ballPosition, 1000/60);