export class Autoplayer {
  constructor(jungleBoard) {
    this.board = jungleBoard;
  }

  randomMove() {
    const animalMap = this.board.getAnimalMap(-1);
    const keys = Object.keys(animalMap);
    for (let i = keys.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    for (const key of keys) {
      const [row, col] = animalMap[key];
      const targets = Autoplayer.getTargets(row, col);
      for (let i = targets.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        [targets[i], targets[j]] = [targets[j], targets[i]];
      }
      this.board.action(row, col); // select first
      for (const target of targets) {
        const { action, source } = this.board.action(target[0], target[1]); // try moves
        if (action === "move") {
          return { autoSource: source, autoTargetID: `${target[0]}${target[1]}` };
        }
      }
    }
  }

  miniMaxMove() {
    
  }

  static getTargets(row, col) {
    const results = [];
    if (row - 1 >= 0) {
        results.push([row - 1, col]);
    }
    if (row + 1 <= 8) {
        results.push([row + 1, col]);
    }
    if (col - 1 >= 0) {
        results.push([row, col - 1]);
    }
    if (col + 1 <= 6) {
        results.push([row, col + 1]);
    }
    return results;
  }
}