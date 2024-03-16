import Player from "./classes/playerClass";
import {
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
} from "./display/display";
const gameBoard = "gameBoard";
const newGame = document.querySelector("#newGame");
const Player1Name = document.querySelector("#player1");
const Player2Name = document.querySelector("#player2");
const getPlayer2Name = document.querySelector("#player2Button");
const AiButton = document.querySelector("#AI");
const startButton = document.querySelector("#startGame");
function createAiTurnListener(player1, player2) {
  const listener = function aiTurnListener(event) {
    if (player1.win === true || player2.win === true) {
      document.removeEventListener("fired", listener);
      const winningPlayer = player1.win ? player1.name : player2.name;
      const message = document.querySelector("#placeMessage");
      message.textContent = `${winningPlayer} Wins!`;
      return;
    }
    aiTurn(player1, player2);
    document.removeEventListener("fired", listener);
  };
  return listener;
}

function opponentsTurn(player1, player2) {
  // setTimeout(() => {
  //  renderGameBoard()
  // }, 2000);

  playAgainstPlayer(player1, player2);
}
function createPlayerTurnListner(player1, player2) {
  const listener = function playerTurnListner(event) {
    if (player1.win === true || player2.win === true) {
      document.removeEventListener("fired", listener);
      const winningPlayer = player1.win ? player1.name : player2.name;
      const message = document.querySelector("#placeMessage");
      message.textContent = `${winningPlayer} Wins!`;
      return;
    }
    const currentPlayer = player1.turn ? player1 : player2;
    const nextPlayersTurn = player1.turn ? player2 : player1;

    renderGameBoard(currentPlayer, gameBoard);

    setTimeout(() => {
      opponentsTurn(currentPlayer, nextPlayersTurn);
    }, 2000);
  };
  return listener;
}
function playAgainstPlayer(player1, player2) {
  updateUIPlay(player1, player2);
  addFireEventListener(player1, player2);
  const playerTurnListner = createPlayerTurnListner(player1, player2);
  document.addEventListener("fired", playerTurnListner);
}
function playAgainstAi(player1, player2) {
  player1.turn = true;
  updateUIPlay(player1, player2);
  addFireEventListener(player1, player2);
  const aiTurnListener = createAiTurnListener(player1, player2);
  document.addEventListener("fired", aiTurnListener);
}

function aiTurn(player, computer) {
  updateUIPlay(player, computer);

  setTimeout(() => {
    const result = computer.computerAttack(player);
    if (result.attackResult === "Hit") {
      hitAnimation(result.coordinates);
    }
    if (result.attackResult === "Miss") {
      missAnimation(result.coordinates);
    }
  }, 1000);
  setTimeout(() => {
    removeGameBoardAnimation(gameBoard);
    document.getElementById(gameBoard).classList.add("zoom-out");
  }, 3000);
  setTimeout(() => {
    renderGameBoard(player, gameBoard);
    console.log(player.turn);
    playAgainstAi(player, computer);
  }, 4000);
  // setTimeout(() => {

  // }, 4000);
}

function setupPlayerGameBoard(player) {
  clearGameBoard();
  addBoardNumbersAndLetters();
  placeYourShipsMessage(player.name);

  addPlacementButtons();

  renderGameBoard(player, gameBoard);

  addEventListeners(player.gameBoard);
}

function opponentCheck() {
  if (Player2Name.value !== "") return Player2Name.value;
  return "AI";
}
function setupGame() {
  const player1 = new Player(Player1Name.value);
  const player2 = new Player(opponentCheck());

  clearScreen();
  setupPlayerGameBoard(player1);

  const readyButton = document.querySelector("#readyButton");
  readyButton.disabled = true;

  document.addEventListener("shipsPlaced", () => {
    readyButton.disabled = false;
  });

  function onReadyButtonClick() {
    if (player2.name === "AI") {
      player2.computer = true;
      player2.initializePossibleCoordinates();
      player2.gameBoard.placeShipsRandom();
      playAgainstAi(player1, player2);
    } else {
      if (!player2.computer) {
        clearScreen();
        setupPlayerGameBoard(player2);

        readyButton.removeEventListener("click", onReadyButtonClick);
        console.log(readyButton);
        const player2readyButton = document.querySelector("#readyButton");
        player2readyButton.addEventListener("click", () => {
          console.log("ready clicked");
          player1.turn = true;
          playAgainstPlayer(player1, player2);
        });
      }
      return null;
    }
    return null;
  }

  // Add the initial event listener for the ready button
  readyButton.addEventListener("click", onReadyButtonClick);
}

newGame.addEventListener("click", () => renderGetPlayer1());
getPlayer2Name.addEventListener("click", () => renderGetPlayer2());
AiButton.addEventListener("click", () => renderVsAi());
startButton.addEventListener("click", () => setupGame());
