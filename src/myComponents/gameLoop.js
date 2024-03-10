import Player from "./classes/playerClass";
import {
  renderGameBoard,
  renderGetPlayer1,
  renderGetPlayer2,
  renderVsAi,
  clearScreen,
  placeYourShipsMessage,
  addEventListeners,
} from "./display/display";

const newGame = document.querySelector("#newGame");
const Player1Name = document.querySelector("#player1");
const Player2Name = document.querySelector("#player2");
const getPlayer2Name = document.querySelector("#player2Button");
const AiButton = document.querySelector("#AI");
const startButton = document.querySelector("#startGame");
const square = document.querySelector(".boardSquare");

function opponentCheck() {
  if (Player2Name.value !== "") return Player2Name.value;
  return "AI";
}
function startGame() {
  const player1 = new Player(Player1Name.value);
  const player2 = new Player(opponentCheck());
  if (player2.name === "AI") {
    player2.computer = true;

    clearScreen();
    placeYourShipsMessage(player1.name);
    renderGameBoard(player1.gameBoard.gameBoard, "gameBoard");
    addEventListeners(player1.gameBoard);
  }
}

newGame.addEventListener("click", () => renderGetPlayer1());
getPlayer2Name.addEventListener("click", () => renderGetPlayer2());
AiButton.addEventListener("click", () => renderVsAi());
startButton.addEventListener("click", () => startGame());
