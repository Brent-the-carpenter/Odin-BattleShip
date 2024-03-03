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

test("make sure hit property increments property is initilized null", () => {
  expect(ship.hit()).toBe(1);
});

test("should return sunk if ship.length is equal to ship hits", () => {
  const ship2 = new Ship(3);
  ship2.hit();
  ship2.hit();
  ship2.hit();
  expect(ship2.isSunk()).toBeTruthy();
});
