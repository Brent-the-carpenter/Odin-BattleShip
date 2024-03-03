export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = null;
    this.sunk = false;
  }

  hit() {
    this.hits += 1;
    return this.hits;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
