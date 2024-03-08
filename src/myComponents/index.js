import "./style.css";
import "./gameLoop";

import Player from "./classes/playerClass";

const player1Board = document.querySelector("#gameBoard1");
const player2Board = document.querySelector("#gameBoard2");
const player1 = new Player("brent");
const player2 = new Player("computer");

// document.addEventListener("DOMContentLoaded", (event) => {
//   renderGameBoard(player1.gameBoard.gameBoard, "gameBoard1");
//   renderGameBoard(player2.gameBoard.gameBoard, "gameBoard2");
// });
