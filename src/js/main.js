const gameEngine = new GameEngine(
  new Ball(".ball"),
  new ScoreDisplay(".left-score", ".right-score"),
  new Goalkeeper(".left-goalkeeper"),
  new Goalkeeper(".right-goalkeeper")
);

let stepLeftGK = 0;
let stepRightGK = 0;

document.onkeydown = function (event) {
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
    case "Space":
      gameEngine.pause();
      break;
    case "Enter":
      if (gameEngine.pauseStatus == false) {
        gameEngine.stop();
        gameEngine.start();
      }
      break;
  }
};

document.onkeyup = function (event) {
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
