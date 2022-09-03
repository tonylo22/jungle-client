import { JungleBoard } from "./Jungle.class";

export class Animal {
  constructor(species, player) {
      this.rank = ["elephant", "lion", "tiger", "leopard", "wolf", "dog", "cat", "rat"];
      this.species = species.toLowerCase();
      this.player = player;
  }

  move(targetRow, targetCol, currentPos, targetTerrainType, currentTerrainType) {
      if (targetTerrainType !== "river") {
          const [currentRow, currentCol] = currentPos;
          if ((Math.abs(targetRow - currentRow) === 1 && targetCol === currentCol)
            ||(Math.abs(targetCol - currentCol) === 1 && targetRow === currentRow)) {
              return true;
          }
      }
      return false;
  }
  
  capture(targetAnimal, targetTerrainType) {
      return targetTerrainType === "trap" || this.rank.indexOf(this.species) <= this.rank.indexOf(targetAnimal.species);
  }
}

export class LionTiger extends Animal {
  move(targetRow, targetCol, currentPos, targetTerrainType, currentTerrainType) {
    const [currentRow, currentCol] = currentPos;
    if (targetTerrainType !== "river") {
      if ((Math.abs(targetRow - currentRow) === 1 && targetCol === currentCol)
        ||(Math.abs(targetCol - currentCol) === 1 && targetRow === currentRow)) {
          return true;
      }
      else {
        if (targetTerrainType === "riverside" && currentTerrainType === "riverside") {
          if ((this.species === "lion" && targetRow === currentRow && Math.abs(targetCol - currentCol) === 3) || (targetCol === currentCol)) {
            return !JungleBoard.isRiverBlockedByRat(currentRow, targetRow, currentCol, targetCol);
          }
        }
      }
    }
    return false;
  }
}

export class Rat extends Animal {
  move(targetRow, targetCol, currentPos, targetTerrainType, currentTerrainType) {
    const [currentRow, currentCol] = currentPos;
    if ((Math.abs(targetRow - currentRow) === 1 && targetCol === currentCol)
      ||(Math.abs(targetCol - currentCol) === 1 && targetRow === currentRow)) {
        this.rank = currentTerrainType !== "river" ?
            ["lion", "tiger", "leopard", "wolf", "dog", "cat", "rat", "elephant"]
            : ["elephant", "lion", "tiger", "leopard", "wolf", "dog", "cat", "rat"];
        return true;
      }
      return false;
  }
}