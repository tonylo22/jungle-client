import { Animal, LionTiger, Rat } from "./Animal.class";
import { TERRAIN } from "./constants.class";

export class JungleBoard {
  static instance;

  static getInstance() {
    if (!JungleBoard.instance) {
        JungleBoard.instance = new JungleBoard();
    }
    return JungleBoard.instance;
  }

  static newBoard() {
    return [
      [new LionTiger("lion", -1), null, null, null, null, null, new LionTiger("tiger", -1)],
      [null, new Animal("dog", -1), null, null, null, new Animal("cat", -1), null],
      [new Rat("rat", -1), null, new Animal("leopard", -1), null, new Animal("wolf", -1), null, new Animal("elephant", -1)],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [new Animal("elephant", 1), null, new Animal("wolf", 1), null, new Animal("leopard", 1), null, new Rat("rat", 1)],
      [null, new Animal("cat", 1), null, null, null, new Animal("dog", 1), null],
      [new LionTiger("tiger", 1), null, null, null, null, null, new LionTiger("lion", 1)]
    ];
  }

  constructor() {
    this.selected = null;
    this.selectedPos = null;
    this.whoseTurn = 1;
    this.terrain = TERRAIN;
    this.board = JungleBoard.newBoard();
  }

  action(targetRow, targetCol) {
    const targetTerrainType = this.terrain[targetRow][targetCol];
    const targetAnimal = this.board[targetRow][targetCol];
    if (targetAnimal) {
      // if click on unselected own Animal, select it
      if (targetAnimal.player === this.whoseTurn && targetAnimal !== this.selected) {
        this.selected = targetAnimal;
        this.selectedPos = [targetRow, targetCol];
        return {action: "select"};
      }
      // if already selected an Animal, and click on an opponent Animal
      else if (this.selected && targetAnimal.player === -this.whoseTurn) {
        const currentTerrainType = this.terrain[this.selectedPos[0]][this.selectedPos[1]];
        if (this.selected.move(targetRow, targetCol, this.selectedPos, targetTerrainType, currentTerrainType) &&
            this.selected.capture(targetAnimal, targetTerrainType)) {
            this.update(targetRow, targetCol);
            return {action:"move"};
        }
      }
    }
    else {
      const currentTerrainType = this.terrain[this.selectedPos[0]][this.selectedPos[1]];
      // if already selected an Animal, and click on empty squares
      if (this.selected && this.selected.move(targetRow, targetCol, this.selectedPos, targetTerrainType, currentTerrainType)) {
        if ((this.whoseTurn === 1 && targetTerrainType === "-den") || (this.whoseTurn === -1 && targetTerrainType === "den")) {
          this.win();
        }
        this.update(targetRow, targetCol);
        return {action:"move"};
      }
    }
    return {action: "default"};
  }

  snapshot() {
    return this.board.map(row => row.map(animal => animal? `${animal.player === -1? "-":""}${animal.species}` : ""));
  }

  update(targetRow, targetCol) {
      const [currentRow, currentCol] = this.selectedPos;
      this.board[targetRow][targetCol] = this.selected;
      this.board[currentRow][currentCol] = null;
      this.selected = null;
      this.selectedPos = null;
      this.whoseTurn = -this.whoseTurn;
  }

  win() {
    alert(`${this.whoseTurn===1? "Blue":"Red"} player wins!`);
  }

  getAnimalMap(player) {
    const animalMap = {};
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] instanceof Animal && this.board[row][col].player === player) {
          animalMap[this.board[row][col].species] = [row, col];
        }
      }
    }
    return animalMap;
  }

  resetBoard() {
    this.selected = null;
    this.selectedPos = null;
    this.whoseTurn = 1;
    this.board = JungleBoard.newBoard();
  }

  static isRiverBlockedByRat(currentRow, targetRow, currentCol, targetCol) {
    if (targetRow === currentRow) {
        const leftBank = Math.min(currentCol, targetCol);
        return JungleBoard.instance.board[targetRow][leftBank + 1] instanceof Rat
            || JungleBoard.instance.board[targetRow][leftBank + 2] instanceof Rat;
    }
    else {
        return JungleBoard.instance.board[3][targetCol] instanceof Rat
            || JungleBoard.instance.board[4][targetCol] instanceof Rat
            || JungleBoard.instance.board[5][targetCol] instanceof Rat;
    }
  }
}