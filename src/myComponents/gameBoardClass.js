import Ship from "./shipClass";

export default class GameBoard {
  constructor() {
    this.gameBoard = GameBoard.createGameBoard();
  }

  static createGameBoard() {
    const newgameBoard = new Map();
    const xPositions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

    xPositions.forEach((letter) => {
      for (let i = 0; i < 10; i += 1) {
        newgameBoard.set(letter + i, null);
      }
    });

    return newgameBoard;
  }

  static getcolumnLetterIndex(letter) {
    const xPositions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    return xPositions.findIndex((element) => element === letter);
  }

  static getcolumnletter(index) {
    const xPositions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    return xPositions[index];
  }

  placeShip(size, location, orientation) {
    const column = location.slice(0, 1);
    const row = parseInt(location.slice(1), 10);
    const newShip = new Ship(size);
    const positions = [];
    if (orientation === "horizontal") {
      const indexOfLetter = GameBoard.getcolumnLetterIndex(column);

      for (let i = 0; i < size; i += 1) {
        const nextColumn = GameBoard.getcolumnletter(indexOfLetter + i);

        if (nextColumn !== undefined) {
          positions.push(nextColumn + row);
        }
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i < size; i += 1) {
        positions.push(column + (row + i));
      }
    }
    if (positions.every((pos) => this.gameBoard.get(pos) === null)) {
      positions.forEach((pos) => this.gameBoard.set(pos, newShip));
      return "ship placed successfully";
    }
    return "space is full";
  }

  missCoordinates = [];

  hitCoordinates = [];

  receiveAttack(coordinates) {
    const attackLocation = this.gameBoard.get(coordinates);
    if (attackLocation === undefined) {
      return "Invalid coordinates";
    }

    if (attackLocation !== null) {
      attackLocation.hit();
      if (attackLocation.isSunk()) {
        return "Ship sunk";
      }
      this.hitCoordinates.push(coordinates);
      return "Hit";
    }
    this.gameBoard.set(coordinates, "Miss");
    this.missCoordinates.push(coordinates);
    return "Miss";
  }

  allShipsSunk() {
    const ships = Array.from(this.gameBoard.values()).filter(
      (value) => value !== null
    );
    return ships.every((ship) => ship.isSunk());
  }
}
