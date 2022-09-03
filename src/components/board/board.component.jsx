import { useContext } from "react";
import { BoardContext } from "../../board.context";
import Square from "../square/square.component";
import { TERRAIN } from "../../game-classes/constants.class";
import "./board.style.css";
import { JungleBoard } from "../../game-classes/Jungle.class";

const Board = () => {
  const { isOwnTurn, isBluePlayer } = useContext(BoardContext);
  let currentBoard = JungleBoard.getInstance().snapshot().flat();
  let selectedPos = [...JungleBoard.getInstance().selectedPos];

  if (!isBluePlayer) {
    currentBoard.reverse();
    selectedPos = [8-selectedPos[0], 6-selectedPos[1]];
  }

  return (
    <div className="squares-container">
      {currentBoard.map( (animal, index) => {
        const row = Math.floor(index / 7);
        const col = index % 7;
        const isLand = TERRAIN[row][col] !== "river";
        const isSelected = isOwnTurn !== false && row === selectedPos[0] && col === selectedPos[1];
        return <Square key={index} row={row} col={col} animal={animal} isLand={isLand} isSelected={isSelected} />
      })}
    </div>
  );
}

export default Board;