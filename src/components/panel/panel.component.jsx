import { useContext } from "react";
import { BoardContext } from "../../context/board.context";
import { ReactComponent as Tree } from "../../assets/icons/tree.svg";
import Button from "../button/button.component";
import "./panel.style.css";

const Panel = () => {
  const { restart } = useContext(BoardContext);

  return (
    <div className="panel-container">
      <div className="logo">Jungle  <Tree fill="#e38542"/></div>
      <div className="top-message">
        Click a blue animal to begin. <button onClick={restart}>restart</button> anytime.
        <hr/>
        Open a room and invite a friend to play &#128227;
      </div>
      <div className="room-panel">
        <div id="room-message">Welcome to Jungle!</div>
        <input id="room-input" placeholder="Room Name..." />
        <input id="player-input" placeholder="Your Name..." />
        <Button purpose="create">Create Room</Button>
        <Button purpose="join">Join Room</Button>
        <br/>
        <Button purpose="leave">Quit Room</Button>
      </div>
    </div>
  )
}

export default Panel;