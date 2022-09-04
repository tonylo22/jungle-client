import { useState, useContext } from "react";
import { BoardContext } from "../../board.context";
import RoomPanel from "../room-panel/room-panel.component";
import { ReactComponent as Restart} from "../../assets/icons/restart.svg";
import "./mobile-panel.style.css";

const MobilePanel = () => {
  const [isRoomPanelOpen, setisRoomPanelOpen] = useState(false);
  const { restart, currentRoom } = useContext(BoardContext);

  return (
    <div className="mobile-panel-container">
      <div className="logo">Jungle</div>
      <button className="room-panel-btn" onClick={() => setisRoomPanelOpen(!isRoomPanelOpen)}>
        {isRoomPanelOpen? "Close \u2A2F": currentRoom? `You're in ${currentRoom}`:"Room Game"}
      </button>
      <Restart className="restart-btn" onClick={restart} />
      {isRoomPanelOpen && <RoomPanel />}
    </div>
  );
};

export default MobilePanel;