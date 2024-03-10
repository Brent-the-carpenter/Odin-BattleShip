import GameBoard from "../classes/gameBoardClass";

const newGame = document.querySelector("#newGame");
const body = document.querySelector("body");
const gatherPlayer1Info = document.querySelector("#gatherPlayer1Info");
const StartGame = document.querySelector("#startGame");
const opponentContainer = document.querySelector(".opponentContainer");
const gatherPlayer2Info = document.querySelector("#gatherPlayer2Info");
const vsAi = document.querySelector("#vs");
const greeting = document.querySelector("#greeting");
const boardContainer = document.querySelector(".boardContainer");

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
  newGame.style.display = "none";
  gatherPlayer1Info.style.display = "block";
  body.appendChild(gatherPlayer1Info);
}
function renderGetPlayer2() {
  opponentContainer.style.display = "none";
  gatherPlayer2Info.style.display = "block";
  StartGame.style.display = "block";
}

function renderVsAi() {
  opponentContainer.style.display = "none";
  vsAi.style.display = "block";
  StartGame.style.display = "block";
}

function clearScreen() {
  StartGame.style.display = "none";
  opponentContainer.style.display = "none";
  vsAi.style.display = "none";
  gatherPlayer1Info.style.display = "none";
  greeting.style.display = "none";
}

function placeYourShipsMessage(player) {
  const div = document.createElement("div");
  div.setAttribute("id", "placeShipMessage");
  const placeShipMessage = `${player} place your ships`;
  div.textContent = placeShipMessage;
  const letterContainer = document.createElement("div");
  letterContainer.setAttribute("id", "letterContainer");
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  letters.forEach((value) => {
    const letter = document.createElement("div");
    letter.classList.add("letter");
    letter.textContent = value;
    letterContainer.appendChild(letter);
  });
  const numberContainer = document.createElement("div");
  numberContainer.setAttribute("id", "numberContainer");
  const numbers = ["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  numbers.forEach((value) => {
    const number = document.createElement("div");
    number.classList.add("number");
    number.textContent = value;
    numberContainer.appendChild(number);
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("id", "placeShipButtons");
  const readyButton = document.createElement("button");
  readyButton.textContent = "Ready";
  readyButton.setAttribute("id", "readyButton");

  const orientationButton = document.createElement("button");
  orientationButton.setAttribute("id", "orientation");
  orientationButton.textContent = "Horizontal";
  orientationButton.addEventListener("click", () => {
    orientationButton.textContent =
      orientationButton.textContent === "Horizontal"
        ? "Vertical"
        : "Horizontal";
  });

  body.prepend(div);
  div.append(numberContainer);
  buttonContainer.appendChild(readyButton);
  buttonContainer.appendChild(orientationButton);
  body.appendChild(buttonContainer);
  boardContainer.append(letterContainer);
  boardContainer.style.display = "flex";
}

function getOrientation() {
  const orientation = document.querySelector("#orientation").textContent;
  return orientation;
}
function addEventListeners(gameBoard) {
  const boardSquare = document.querySelectorAll(".boardSquare");

  boardSquare.forEach((square) => {
    square.addEventListener("click", (event) => {
      const location = event.target.id;
      console.log(location);
      const result = gameBoard.clickEventHandler(location);
      console.log(result);
    });
  });
}

export {
  renderGameBoard,
  renderGetPlayer1,
  renderGetPlayer2,
  renderVsAi,
  clearScreen,
  placeYourShipsMessage,
  addEventListeners,
  getOrientation,
};
