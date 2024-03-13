export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.shipHit = false;
    this.sunk = false;
  }

  hit() {
    if (this.isSunk()) {
      return "already sunk";
    }
    this.hits += 1;

    if (this.isSunk()) {
      this.sunk = true;
    }
    return this.hits;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
