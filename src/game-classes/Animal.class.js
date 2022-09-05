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
  
  capture(targetAnimal, targetTerrainType, currentTerrainType) {
    let isHigherRank = this.rank.indexOf(this.species) <= this.rank.indexOf(targetAnimal.species);
    if (this.species === "elephant" && targetAnimal.species === "rat") {
      isHigherRank = false;
    }
    else if (currentTerrainType === "river" && targetAnimal.species === "elephant") {
      isHigherRank = false;
    }
    return targetTerrainType === "trap" || isHigherRank;
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
  constructor(species, player) {
    super(species, player);
    this.rank = ["lion", "tiger", "leopard", "wolf", "dog", "cat", "rat", "elephant"];
  }

  move(targetRow, targetCol, currentPos, targetTerrainType, currentTerrainType) {
    const [currentRow, currentCol] = currentPos;
    if ((Math.abs(targetRow - currentRow) === 1 && targetCol === currentCol)
      ||(Math.abs(targetCol - currentCol) === 1 && targetRow === currentRow)) {
        return true;
      }
      return false;
  }
}