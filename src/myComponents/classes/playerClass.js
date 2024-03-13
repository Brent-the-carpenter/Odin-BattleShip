import GameBoard from "./gameBoardClass";

class Player {
  constructor(name) {
    this.name = name;
    this.computer = false;
    this.gameBoard = new GameBoard();
    this.turn = false;
    this.win = false;
    this.possibleCoordinates = [];
  }

  attack(opponent, coordinates) {
    if (!this.turn) return false;
    const result = opponent.gameBoard.receiveAttack(coordinates);

    if (opponent.gameBoard.allShipsSunk()) {
      this.win = true;
    }
    this.turn = false;
    opponent.turn = true;
    console.log(
      `${this.name} attacks ${opponent.name} on ${coordinates} the result is ${result}`
    );
    return result;
  }

  initializePossibleCoordinates() {
    const columns = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const rows = [...Array(10).keys()];

    this.possibleCoordinates = columns.flatMap((column) =>
      rows.map((row) => `${column}${row}`)
    );
  }

  computerAttack(opponent) {
    if (this.computer && this.turn && !opponent.gameBoard.allShipsSunk()) {
      const randomIndex = Math.floor(
        Math.random() * this.possibleCoordinates.length
      );
      const coordinates = this.possibleCoordinates.splice(randomIndex, 1)[0]; // Remove and get the coordinate

      const attackResult = opponent.gameBoard.receiveAttack(coordinates);

      this.turn = false;

      opponent.turn = true;
      console.log(
        `${this.name} attacks ${opponent} on ${coordinates} the result is ${attackResult}`
      );
      return attackResult;
    }
    return undefined;
  }
}
export default Player;
