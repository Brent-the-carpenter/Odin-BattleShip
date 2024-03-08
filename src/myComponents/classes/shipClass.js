export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (this.isSunk()) {
      this.sunk = true;
      return "already sunk";
    }
    this.hits += 1;
    return this.hits;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
