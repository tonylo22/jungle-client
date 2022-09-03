import { useContext } from "react";
import { BoardContext } from "../../context/board.context";
import Square from "../square/square.component";
import { TERRAIN } from "../../game-classes/constants.class";
import "./board.style.css";

const Board = () => {
  const { currentBoard, selectedPos, isOwnTurn, isBluePlayer } = useContext(BoardContext);
  let boardToRender = currentBoard.flat();
  let selectedPosToRender = selectedPos;

  if (!isBluePlayer) {
    boardToRender.reverse();
    selectedPosToRender = [8-selectedPos[0], 6-selectedPos[1]];
  }

  return (
    <div className="squares-container">
      {boardToRender.map( (animal, index) => {
        const row = Math.floor(index / 7);
        const col = index % 7;
        const isLand = TERRAIN[row][col] !== "river";
        const isSelected = isOwnTurn !== false && row === selectedPosToRender[0] && col === selectedPosToRender[1];
        return <Square key={index} row={row} col={col} animal={animal} isLand={isLand} isSelected={isSelected} />
      })}
    </div>
  );
}

export default Board;