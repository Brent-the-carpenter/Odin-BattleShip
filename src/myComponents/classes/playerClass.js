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
    const result = opponent.gameBoard.receiveattack(coordinates);
    this.turn = false;
    opponent.turn = true;
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
      console.log(attackResult);
      this.turn = false;

      opponent.turn = true;

      return attackResult;
    }
    return undefined;
  }
}
export default Player;
