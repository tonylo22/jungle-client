import { useContext } from "react";
import { BoardContext } from "../../board.context";
import { ReactComponent as Tree } from "../../assets/icons/tree.svg";
import { COLORS } from "../../game-classes/constants.class";
import RoomPanel from "../room-panel/room-panel.component";
import "./panel.style.css";

const Panel = () => {
  const { restart } = useContext(BoardContext);

  return (
    <div className="panel-container">
      <div className="logo">Jungle  <Tree fill={COLORS.logo}/></div>
      <div className="top-message">
        Click a blue animal to begin. <button onClick={restart}>restart</button> anytime.
        <hr/>
        Open a room and invite a friend to play &#128227;
      </div>
      <RoomPanel />
    </div>
  )
}

export default Panel;