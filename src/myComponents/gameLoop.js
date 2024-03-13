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
} from "./display/display";

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
function playAgainstAi(player1, player2) {
  player1.turn = true;
  updateUIPlay(player1, player2);
  addFireEventListener(player1, player2);
  const aiTurnListener = createAiTurnListener(player1, player2);
  document.addEventListener("fired", aiTurnListener);
}

function aiTurn(player, computer) {
  setTimeout(() => {
    updateUIPlay(player, computer);
  }, 2000);
  setTimeout(() => {
    computer.computerAttack(player);
    renderGameBoard(player, "gameBoard");
    console.log(player.turn);
  }, 3000);

  setTimeout(() => {
    playAgainstAi(player, computer);
  }, 5000);
}

function setupPlayerGameBoard(player) {
  clearGameBoard();
  placeYourShipsMessage(player.name);

  renderGameBoard(player, "gameBoard");

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

        readyButton.addEventListener("click", () => {
          // Code to start the game or finalize player2's setup
          // This might involve checking shipsPlaced for player2 and then starting the game
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
