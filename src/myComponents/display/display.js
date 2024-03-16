import GameBoard from "../classes/gameBoardClass";
import Ship from "../classes/shipClass";

const newGame = document.querySelector("#newGame");
const body = document.querySelector("body");
const gatherPlayer1Info = document.querySelector("#gatherPlayer1Info");
const StartGame = document.querySelector("#startGame");
const opponentContainer = document.querySelector(".opponentContainer");
const gatherPlayer2Info = document.querySelector("#gatherPlayer2Info");
const vsAi = document.querySelector("#vs");
const greeting = document.querySelector("#greeting");
const boardContainer = document.querySelector(".boardContainer");
function removeGameBoardAnimation(containerId) {
  const container = document.getElementById(containerId);
  if (container.classList.contains("zoom-in")) {
    container.classList.remove("zoom-in");
  }
  if (container.classList.contains("zoom-out")) {
    container.classList.remove("zoom-out");
  }
}
function renderGameBoard(player, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = " ";
  if (container) {
    container.classList.add("zoom-in");
  }
  const hitCoordinates = [...player.gameBoard.hitCoordinates];
  const missCordinates = [...player.gameBoard.missCoordinates];
  player.gameBoard.gameBoard.forEach((value, key) => {
    const square = document.createElement("div");
    square.classList.add("boardSquare");

    if (value instanceof Ship) {
      square.classList.add("Ship");

      if (value.sunk === true) {
        square.classList.add("sunk");
        square.textContent = "X";
      }
    }
    if (missCordinates.includes(key) === true) {
      square.classList.add("hasBeenMissed");

      square.textContent = "M";
    }
    if (hitCoordinates.includes(key) === true) {
      square.classList.add("hasBeenHit");

      square.textContent = "X";
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
  if (document.querySelector("#placeMessage")) {
    const message = document.getElementById("placeMessage");
    body.removeChild(message);
  }
  if (document.querySelector("#letterContainer")) {
    const letterContainer = document.getElementById("letterContainer");
    boardContainer.removeChild(letterContainer);
  }
  if (document.querySelector("#numberContainer")) {
    const numberContainer = document.getElementById("numberContainer");
    body.removeChild(numberContainer);
  }
  if (document.querySelector("#placeShipButtons")) {
    const placeShipButtons = document.getElementById("placeShipButtons");
    body.removeChild(placeShipButtons);
  }
}

function placeYourShipsMessage(player) {
  const div = document.createElement("div");
  div.setAttribute("id", "placeMessage");
  const placeShipMessage = `${player} place your ships`;
  div.textContent = placeShipMessage;

  body.prepend(div);

  boardContainer.style.display = "flex";
}
function addBoardNumbersAndLetters() {
  const numberContainer = document.createElement("div");
  numberContainer.setAttribute("id", "numberContainer");
  const numbers = ["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  numbers.forEach((value) => {
    const number = document.createElement("div");
    number.classList.add("number");
    number.textContent = value;
    numberContainer.appendChild(number);
  });
  const letterContainer = document.createElement("div");
  letterContainer.setAttribute("id", "letterContainer");
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  letters.forEach((value) => {
    const letter = document.createElement("div");
    letter.classList.add("letter");
    letter.textContent = value;
    letterContainer.appendChild(letter);
  });
  body.prepend(numberContainer);
  boardContainer.append(letterContainer);
}
function addPlacementButtons() {
  const orientationButton = document.createElement("button");
  orientationButton.setAttribute("id", "orientation");
  orientationButton.textContent = "Horizontal";
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("id", "placeShipButtons");
  const readyButton = document.createElement("button");
  readyButton.textContent = "Ready";
  readyButton.setAttribute("id", "readyButton");
  orientationButton.addEventListener("click", () => {
    orientationButton.textContent =
      orientationButton.textContent === "Horizontal"
        ? "Vertical"
        : "Horizontal";
  });
  body.appendChild(buttonContainer);
  buttonContainer.appendChild(readyButton);
  buttonContainer.appendChild(orientationButton);
}
function calculateShipPositions(startColumn, startRow, orientation, size) {
  const positions = [];
  const indexOfLetter = GameBoard.getColumnLetterIndex(startRow); // Assuming this method exists and correctly returns an index for a column letter

  for (let i = 0; i < size; i += 1) {
    let nextColumn;
    let nextRow;

    if (orientation === "Horizontal") {
      nextRow = GameBoard.getColumnLetter(indexOfLetter);
      nextColumn = startColumn + i;

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
function checkIfEventOrCoordinates(event) {
  let id;
  if (event && event.target && event.target.id) {
    id = event.target.id;
  } else {
    id = event;
  }
  return id;
}
function hitAnimation(event) {
  const id = checkIfEventOrCoordinates(event);
  const square = document.getElementById(id);
  square.classList.add("hit");
  square.textContent = "X";
}
function missAnimation(event) {
  const id = checkIfEventOrCoordinates(event);
  const square = document.getElementById(id);
  square.classList.add("miss");
  square.textContent = "M";
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
function addFireEventListener(player1, player2) {
  console.log("add fire event running");
  const squares = document.querySelectorAll(".boardSquare");
  squares.forEach((square) => {
    square.addEventListener("click", (event) => {
      // Execute the attack and capture the result
      const attackResult = player1.attack(player2, event.target.id);
      console.log(`Fire ${attackResult} on square ${event.target.id}`);
      if (attackResult === "Hit") {
        hitAnimation(event);
      }
      if (attackResult === "Miss") {
        missAnimation(event);
      }
      setTimeout(() => {
        removeGameBoardAnimation("gameBoard");
        document.getElementById("gameBoard").classList.add("zoom-out");
      }, 1500);
      setTimeout(() => {
        // Update the game board based on the attack's outcome
        removeGameBoardAnimation("gameBoard");
        renderGameBoard(player2, "gameBoard");

        // Dispatch a custom "fired" event with details of the attack
        document.dispatchEvent(
          new CustomEvent("fired", {
            detail: {
              attacker: player1,
              opponent: player2,
              target: event.target.id,
              result: attackResult,
            },
          })
        );
      }, 2000);
    });
  });
}

function updateUIPlay(player1, player2) {
  console.log(`${player1.turn} ${player2.turn}`);
  document.querySelector("#readyButton").style.display = "none";
  document.querySelector("#orientation").style.display = "none";
  const opponentsBoard = player1.turn ? player2 : player1;
  console.log(` update ui running${opponentsBoard.name}`);
  const placeMessage = document.querySelector("#placeMessage");
  if (player1.win) {
    placeMessage.textContent = `${player1} Wins!`;
  }
  if (player2.win) {
    placeMessage.textContent = `${player2.name} Wins!`;
  }
  const currentplayerName = player1.turn ? player1.name : player2.name;
  placeMessage.textContent = `${currentplayerName}'s turn`;
  clearGameBoard();
  renderGameBoard(
    opponentsBoard,

    "gameBoard"
  );
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
  addFireEventListener,
  clearGameBoard,
  addBoardNumbersAndLetters,
  addPlacementButtons,
  hitAnimation,
  missAnimation,
  removeGameBoardAnimation,
};