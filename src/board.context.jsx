import { createContext, useReducer, useEffect } from "react";
import { JungleBoard } from "./game-classes/Jungle.class";
import { Autoplayer } from "./game-classes/Autoplayer.class";
import io from "socket.io-client";

JungleBoard.getInstance();
const autoplayer = new Autoplayer(JungleBoard.getInstance());
const socket = io("https://jungle-online.herokuapp.com/");
// const socket = io("http://localhost:3001"); // dev server

export const BoardContext = createContext({
  currentRoom: null,
  isOwnTurn: null,
  isBluePlayer: true,
  tryAction: () => {},
  restart: () => {},
  createRoom: () => {},
  joinRoom: () => {},
  leaveRoom: () => {}
});

const INITIAL_STATE = {
  currentRoom: null,
  isOwnTurn: null,
  isBluePlayer: true
};

const boardReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "select":
      return {
        ...state,
        isOwnTurn: state.isOwnTurn === null? true : state.isOwnTurn
      };
    case "move":
      return {
        ...state,
        isOwnTurn: false
      };
    case "receive-select":
      return {
        ...state,
        isOwnTurn: state.isOwnTurn === null? false : state.isOwnTurn
      };
    case "receive-move":
      return {
        ...state,
        isOwnTurn: true
      };
    case "intoRoom":
      return {
        ...INITIAL_STATE,
        currentRoom: payload
      };
    case "invert":
      return {
        ...state,
        isBluePlayer: false
      }
    case "new-auto-game":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const BoardProvider = ({children}) => {
  const [ state, dispatch ] = useReducer(boardReducer, INITIAL_STATE);
  const { currentRoom, isOwnTurn, isBluePlayer } = state;
  console.log(state);

  const correctPos = (target) => {
    return `${8-target[0]}${6-target[1]}`;
  }

  useEffect(() => {
    socket.on("message", message => {
      if (document.getElementById("room-message")) {
        document.getElementById("room-message").innerHTML = message;
      }
    });
    
    socket.on("select", target => {
      JungleBoard.getInstance().action(+target[0], +target[1]);
      dispatch({type:"receive-select"});
      console.log("select received and dispatched");
    })
    
    socket.on("move", target => {
      JungleBoard.getInstance().action(+target[0], +target[1]);
      dispatch({type:"receive-move"});
      console.log("Move received and dispatched");
    });

    socket.on("restart", room => {
      JungleBoard.getInstance().resetBoard();
      dispatch({type:"intoRoom", payload: room});
    });

    socket.on("intoRoom", roomName => {
      JungleBoard.getInstance().resetBoard();
      dispatch({type:"intoRoom", payload: roomName});
    });

    socket.on("leaveRoom", () => {
      JungleBoard.getInstance().resetBoard();
      dispatch({type:"new-auto-game"});
    });

    socket.on("invert", () => {
      dispatch({type:"invert"});
    });
  }, []);

  const dispatchSelect = (target) => {
    if (currentRoom) {
      socket.emit("select", {target: target, room: currentRoom});
      if (isOwnTurn === null) {
        socket.emit("invert", currentRoom);
      }
      console.log("select emitted");
    }
    dispatch({type: "select", payload: null});
  }

  const dispatchMove = (target) => {
    dispatch({type: "move"});
    if (currentRoom) {
      socket.emit("move", {target: target, room: currentRoom});
      console.log("move emitted");
    }
    else {
      autoplayer.randomMove();
      dispatch({type: "receive-move"});
    }
  };

  const tryAction = (target) => {
    if (currentRoom && isOwnTurn === false) return;
    if (! isBluePlayer) {
      target = correctPos(target);
    }
    const { action } = JungleBoard.getInstance().action(+target[0], +target[1]);
    if (action === "select") {
      dispatchSelect(target);
    }
    else if (action === "move") {
      dispatchMove(target);
    }
  };
  
  const restart = () => {
    if (currentRoom) {
      socket.emit("restart", currentRoom);
    }
    else {
      JungleBoard.getInstance().resetBoard();
      dispatch({type:"new-auto-game"});
    }
  }

  const createRoom = (roomName, playerName) => {
    if (!roomName || !playerName) return;
    socket.emit("createRoom", {roomName, playerName});
  }

  const joinRoom = (roomName, playerName) => {
    if (!roomName || !playerName) return;
    socket.emit("joinRoom", {roomName, playerName});
  }

  const leaveRoom = () => {
    if (!currentRoom) return;
    socket.emit("leaveRoom", currentRoom);
    document.getElementById("room-input").value = "";
    document.getElementById("player-input").value = "";
  }

  const value = {
    currentRoom,
    isOwnTurn,
    isBluePlayer,
    tryAction,
    restart,
    createRoom,
    joinRoom,
    leaveRoom
  };
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
};

