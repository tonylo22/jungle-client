import Button from "../button/button.component";
import "./room-panel.style.css";

const RoomPanel = () => {
  return (
    <div className="room-panel">
      <div id="room-message">Welcome to Jungle!</div>
      <input id="room-input" placeholder="Room Name..." />
      <input id="player-input" placeholder="Your Name..." />
      <Button purpose="create">Create Room</Button>
      <Button purpose="join">Join Room</Button>
      <br/>
      <Button purpose="leave">Quit Room</Button>
    </div>
  );
};

export default RoomPanel;