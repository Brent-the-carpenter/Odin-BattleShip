import Player from "./playerClass";

test(" new Player should return create new instance of player.", () => {
  const player1 = new Player();
  expect(player1).toHaveProperty("name");
  expect(player1).toHaveProperty("turn");
  expect(player1).toHaveProperty("gameBoard");
});
describe("computerAttack method", () => {
  let player;
  let computer;

  beforeEach(() => {
    player = new Player("Human");
    computer = new Player("Computer");
    computer.initializePossibleCoordinates();
    player.gameBoard.placeShip(10, "a1", "horizontal");
    computer.computer = true;
    computer.turn = true;
  });

  test("should only operate on computer's turn", () => {
    computer.turn = false;
    const result = computer.computerAttack(player);
    expect(result).toBeUndefined();
    expect(computer.turn).toBeFalsy();
  });

  test("should select a valid coordinate and attack", () => {
    const initialHits = player.gameBoard.hitCoordinates.length;
    console.log(computer.possible);
    console.log(computer.computerAttack(player));
    expect(player.gameBoard.hitCoordinates.length).toBeGreaterThan(initialHits);
  });

  test("should switch turn to the opponent after attack", () => {
    computer.computerAttack(player);
    expect(computer.turn).toBeFalsy();
    expect(player.turn).toBeTruthy();
  });

  test("should not select previously attacked coordinates", () => {
    for (let i = 0; i < 5; i += 1) {
      computer.computerAttack(player);
    }
    const lastAttack = computer.computerAttack(player);
    expect(computer.possibleCoordinates).not.toContain(lastAttack);
  });
});
