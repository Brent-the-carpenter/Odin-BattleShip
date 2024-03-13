import Ship from "./shipClass";

export default class GameBoard {
  constructor() {
    this.gameBoard = GameBoard.createGameBoard();
    this.ships = [5, 4, 3, 3, 2];
    this.shipsPlaced = false;
    this.shipIndex = 0;
    this.missCoordinates = [];

    this.hitCoordinates = [];
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

  static getColumnLetterIndex(letter) {
    const xPositions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    return xPositions.findIndex((element) => element === letter);
  }

  static getColumnLetter(index) {
    const xPositions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    return xPositions[index];
  }

  placeShipsRandom(ships = this.ships, recursionCount = 0) {
    if (ships.length === 0) {
      return "ships placed successfully";
    }

    if (recursionCount > 100) {
      return "Cannot place ships after 100 attempts";
    }

    const shipsNotPlaced = ships.reduce((notPlaced, ship) => {
      const randomNumber = Math.floor(Math.random() * 10);
      const randomLetter = GameBoard.getColumnLetter(
        Math.floor(Math.random() * 10)
      );
      const orientation = ["horizontal", "vertical"][
        Math.floor(Math.random() * 2)
      ];

      const placementResult = this.placeShip(
        ship,
        randomLetter + randomNumber,
        orientation
      );

      if (placementResult !== "ship placed successfully") {
        notPlaced.push(ship);
      }

      return notPlaced;
    }, []);

    if (shipsNotPlaced.length > 0) {
      return this.placeShipsRandom(shipsNotPlaced, recursionCount + 1);
    }
    this.shipsPlaced = true;
    return "ships placed successfully";
  }

  placeShip(size, location, orientation) {
    const column = location.slice(0, 1);
    const row = parseInt(location.slice(1), 10);
    const newShip = new Ship(size);
    const positions = [];
    console.log(size);
    if (row > 9) return "coordinates out of bounds"; // Simplified bounds check

    let outOfBounds = false; // Flag to mark if ship extends beyond the board
    if (orientation === "Vertical") {
      const indexOfLetter = GameBoard.getColumnLetterIndex(column);
      for (let i = 0; i < size; i += 1) {
        const nextColumn = GameBoard.getColumnLetter(indexOfLetter + i);
        if (nextColumn === undefined || row > 9) {
          // Check for vertical bounds explicitly
          outOfBounds = true;
          break;
        }
        // console.log(nextColumn + row);
        positions.push(nextColumn + row);
      }
    } else {
      // "Horizontial"
      for (let i = 0; i < size; i += 1) {
        if (row + i > 9) {
          // Check for Horizontal bounds explicitly
          outOfBounds = true;
          break;
        }
        // console.log(column + (row + i));
        positions.push(column + (row + i));
      }
    }

    if (outOfBounds) return "coordinates out of bounds";
    if (positions.some((pos) => this.gameBoard.get(pos) !== null)) {
      console.log("space full");
      return "space is full";
    }
    positions.forEach((pos) => this.gameBoard.set(pos, newShip));
    positions.forEach((pos) => {
      document.querySelector(`#${pos}`).style.backgroundColor = "green";
    });

    return "ship placed successfully";
  }

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

    this.missCoordinates.push(coordinates);
    return "Miss";
  }

  allShipsSunk() {
    console.log();
    const ships = Array.from(this.gameBoard.values()).filter(
      (value) => value !== null && value !== "Miss"
    );
    console.log(ships);
    const result = ships.every((ship) => ship.isSunk());

    return result;
  }

  static getOrientation() {
    const orientation = document.querySelector("#orientation").textContent;
    return orientation;
  }

  alertShipsPlaced() {
    if (this.shipsPlaced) {
      document.querySelector("#readyButton").style.backgroundColor = "green";
      const event = new CustomEvent("shipsPlaced", {
        detail: { message: "All ships have been placed" },
      });
      document.dispatchEvent(event);
    }
  }

  clickEventHandler(location) {
    if (this.shipsPlaced === false) {
      const orientation = GameBoard.getOrientation();
      console.log(orientation, location);
      const result = this.placeShip(
        this.ships[this.shipIndex],
        location,
        orientation
      );
      if (result === "ship placed successfully") {
        this.shipIndex += 1;
        if (this.shipIndex === this.ships.length) {
          this.shipsPlaced = true;
          this.alertShipsPlaced();
        }
      }
      if (result === "space is full") {
        return "can not put ship there";
      }
      return result;
    }
    return null;
  }
}
