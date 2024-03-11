import GameBoard from "../classes/gameBoardClass";

describe("testing gameboard creation", () => {
  test("check if map has position a3 ", () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.gameBoard.has("a3")).toBeTruthy();
  });

  test("see if gameboard has 100 positions for a 10x 10 board", () => {
    const gameBoard = new GameBoard();
    const gameBoardKeys = Array.from(gameBoard.gameBoard.keys());
    expect(gameBoardKeys.length).toBe(100);
  });
});

describe("testing ship placement", () => {
  test("places ship on gameboard", () => {
    const gameBoard = new GameBoard();

    expect(gameBoard.placeShip(3, "a3", "Horizontial")).toBe(
      "ship placed successfully"
    );
  });
});

describe("testing recieve attacks function", () => {
  test("should mark ship as hit if ship is in location", () => {
    const newgameBoard = new GameBoard();
    newgameBoard.placeShip(5, "a1", "Vertical");
    expect(newgameBoard.receiveAttack("a1")).toBe("Hit");
    expect(newgameBoard.receiveAttack("b1")).toBe("Hit");
    expect(newgameBoard.receiveAttack("c1")).toBe("Hit");
    expect(newgameBoard.receiveAttack("d1")).toBe("Hit");
    expect(newgameBoard.receiveAttack("e1")).toBe("Ship sunk");
    expect(newgameBoard.receiveAttack("a2")).toBe("Miss");
    expect(newgameBoard.receiveAttack("z3")).toBe("Invalid coordinates");
    expect(newgameBoard.receiveAttack("a15")).toBe("Invalid coordinates");
  });
});
describe("are all ships sunk", () => {
  let gameBoard; // Declare gameBoard here for scope accessibility

  beforeEach(() => {
    gameBoard = new GameBoard(); // Reset gameBoard before each test
    gameBoard.placeShip(1, "a1", "horizontal");
    gameBoard.placeShip(1, "a5", "horizontal");
  });

  test("all ships are sunk", () => {
    gameBoard.receiveAttack("a1");
    gameBoard.receiveAttack("a5");
    expect(gameBoard.allShipsSunk()).toBeTruthy();
  });

  test("not all ships are sunk", () => {
    gameBoard.receiveAttack("a1");

    expect(gameBoard.allShipsSunk()).toBeFalsy();
  });
});

describe("place ships random should place all ships", () => {
  let gameBoard;
  beforeEach(() => {
    gameBoard = new GameBoard();
  });
  test("places 5 ships randomly", () => {
    expect(gameBoard.placeShipsRandom()).toBe("ships placed successfully");
  });
});
