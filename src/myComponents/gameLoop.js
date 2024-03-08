import Player from "./classes/playerClass";
import {
  renderGetPlayer1,
  renderGetPlayer2,
  renderVsAi,
} from "./display/display";

const newGame = document.querySelector("#newGame");
const Player1Name = document.querySelector("#player1").value;
const getPlayer2Name = document.querySelector("#player2Button");
const AiButton = document.querySelector("#AI");

newGame.addEventListener("click", () => renderGetPlayer1());
getPlayer2Name.addEventListener("click", () => renderGetPlayer2());
AiButton.addEventListener("click", () => renderVsAi());
