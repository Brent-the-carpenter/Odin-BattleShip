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
function clearGameBoard() {
  const gameBoard = document.querySelector("#gameBoard");
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
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
  div.setAttribute("id", "placeMessage");
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

function calculateShipPositions(startColumn, startRow, orientation, size) {
  const positions = [];
  const indexOfLetter = GameBoard.getColumnLetterIndex(startRow); // Assuming this method exists and correctly returns an index for a column letter
  console.log(`orientation = ${orientation}`);
  for (let i = 0; i < size; i += 1) {
    let nextColumn;
    let nextRow;

    if (orientation === "Horizontal") {
      nextRow = GameBoard.getColumnLetter(indexOfLetter);
      nextColumn = startColumn + i;
      console.log(nextColumn);
      // Ensure nextRow is within bounds before adding
      if (nextColumn !== undefined && nextColumn <= 9) {
        positions.push(nextRow + nextColumn);
      }
    } else {
      // Assuming Vertical""
      nextRow = GameBoard.getColumnLetter(indexOfLetter + i);
      nextColumn = startColumn;
      // Ensure nextColumn is defined before adding
      if (nextRow !== undefined) {
        positions.push(nextRow + nextColumn);
      }
    }
  }

  return positions;
}

function highlightShipPlacement(startLocation, orientation, size) {
  const startColumn = parseInt(startLocation.slice(1), 10);

  const startRow = startLocation.slice(0, 1);
  const positions = calculateShipPositions(
    startColumn,
    startRow,
    orientation,
    size
  );
  console.log(positions);
  positions.forEach((pos) => {
    const square = document.getElementById(pos);
    if (square) square.classList.add("highlight");
  });
}
function clearHighlight() {
  document.querySelectorAll(".highlight").forEach((square) => {
    square.classList.remove("highlight");
  });
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
    square.addEventListener("mouseover", (event) => {
      const location = event.target.id;

      highlightShipPlacement(
        location,
        GameBoard.getOrientation(),
        gameBoard.ships[gameBoard.shipIndex]
      );
    });

    square.addEventListener("mouseout", (event) => {
      clearHighlight();
    });
  });
}
function addFireEventListner(opponentsBoard) {
  const squares = document.querySelectorAll(".boardSquares");
  squares.forEach((square) => {
    square.addEventListener("click", (event) =>
      opponentsBoard.receiveAttack(event.target.id)
    );
  });
}
function updateUIPlay(player1, player2) {
  document.querySelector("#readyButton").style.display = "none";
  document.querySelector("#orientation").style.display = "none";
  const opponentsBoard = player1.turn ? player1 : player2;
  clearGameBoard();
  renderGameBoard(opponentsBoard.GameBoard.GameBoard, "gameBoard");

  const placeMessage = document.querySelector("#placeMessage");
  if (player1.win) {
    placeMessage.textContent = `${player1} Wins!`;
  }
  if (player2.win) {
    placeMessage.textContent = `${player2.name} Wins!`;
  }
  const currentplayerName = player1.turn ? player1.name : player2.name;
  placeMessage.textContent = `${currentplayerName}'s turn`;
}

export {
  renderGameBoard,
  renderGetPlayer1,
  renderGetPlayer2,
  renderVsAi,
  clearScreen,
  placeYourShipsMessage,
  addEventListeners,
  updateUIPlay,
  addFireEventListner,
  clearGameBoard,
};
