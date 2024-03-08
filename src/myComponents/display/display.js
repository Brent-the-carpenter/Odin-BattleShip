function renderGameBoard(playerBoardState, containerId) {
  console.log(containerId);
  const container = document.getElementById(containerId);
  container.innerHTML = " ";

  playerBoardState.forEach((value, key) => {
    console.log(value);
    const square = document.createElement("div");
    square.classList.add("boardSquare");

    if (value === "ship") {
      square.classList.add("ship");
    } else if (value === "hit") {
      square.classList.add("hit");
    } else if (value === "miss") {
      square.classList.add("miss");
    }

    square.id = key;
    container.appendChild(square);
  });
}

function renderGetPlayer1() {
  console.log("running");
  const newGame = document.querySelector("#newGame");
  const body = document.querySelector("body");
  const gatherPlayer1Info = document.querySelector("#gatherPlayer1Info");
  newGame.style.display = "none";
  gatherPlayer1Info.style.display = "block";
  body.appendChild(gatherPlayer1Info);
}
function renderGetPlayer2() {
  const body = document.querySelector("body");
  const StartGame = document.querySelector("#startGame");
  const opponentContainer = document.querySelector(".opponentContainer");
  const gatherPlayer2Info = document.querySelector("#gatherPlayer2Info");
  opponentContainer.style.display = "none";
  gatherPlayer2Info.style.display = "block";
  StartGame.style.display = "block";
}

function renderVsAi() {
  const body = document.querySelector("body");
  const StartGame = document.querySelector("#startGame");
  const opponentContainer = document.querySelector(".opponentContainer");
  const vsAi = document.querySelector("#vs");
  opponentContainer.style.display = "none";
  vsAi.style.display = "block";
  StartGame.style.display = "block";
}

export { renderGameBoard, renderGetPlayer1, renderGetPlayer2, renderVsAi };
