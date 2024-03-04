import Ship from "./shipClass";

const ship = new Ship(4);
test("ship has length property", () => {
  expect(ship.length).toBeDefined();
});

test("ship has hits property", () => {
  expect(ship).toHaveProperty("hits");
});
test("ship has sunk property", () => {
  expect(ship).toHaveProperty("sunk");
});

test("hit method increments correctly", () => {
  expect(ship.hit()).toBe(1);
});

test("should return sunk if ship.length is equal to ship hits", () => {
  const ship2 = new Ship(3);
  ship2.hit();
  ship2.hit();
  ship2.hit();
  expect(ship2.isSunk()).toBeTruthy();
});
test("should return ship already sunk if you trie to increment past ship length", () => {
  const ship2 = new Ship(3);
  ship2.hit();
  ship2.hit();
  ship2.hit();
  ship2.hit();
  expect(ship2.hit()).toBe("already sunk");
});
