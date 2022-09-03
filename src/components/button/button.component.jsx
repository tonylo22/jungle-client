import { useContext } from "react";
import { BoardContext } from "../../context/board.context";
import "./button.style.css";

const Button = ({purpose, children}) => {
  const { currentRoom, createRoom, joinRoom, leaveRoom } = useContext(BoardContext);

  const isDisabled = (currentRoom && (purpose === "create" || purpose === "join"))
                  || (!currentRoom && (purpose === "leave"));

  switch (purpose) {
    case "create":
      return <button disabled={isDisabled}
              onClick={() => {createRoom(document.getElementById("room-input").value, document.getElementById("player-input").value)}} 
              >
                {children}
              </button>;
    case "join":
      return <button disabled={isDisabled} 
              onClick={() => {joinRoom(document.getElementById("room-input").value, document.getElementById("player-input").value)}}
              >
                {children}
              </button>;
    case "leave":
      return <button disabled={isDisabled} onClick={() => leaveRoom()}>{children}</button>;
    default:
      return <button disabled={isDisabled}></button>;
  }
}

export default Button;