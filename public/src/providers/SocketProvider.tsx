import React, { useContext, useEffect, useReducer, useState } from "react";
import { io, Socket } from "socket.io-client";
import Actions from "../../../common/actions";
import gameReducer from "../reducers/gameReducer";

export const SocketContext = React.createContext<any>(null);
export const GameContext = React.createContext<any>(null);

export const useSocket = () => useContext<Socket>(SocketContext);
export const useGame = () => useContext(GameContext);

const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<Socket>();
  const [state, dispatch] = useReducer(gameReducer, {});

  useEffect(() => {
    const socket = io();

    socket.on(Actions.UPDATE_BOARD, (data: any) => {
      dispatch({ type: Actions.UPDATE_BOARD, data });
    });

    socket.on(Actions.UPDATE_SETTINGS, (data: any) => {
      dispatch({ type: Actions.UPDATE_SETTINGS, data });
    });

    setSocket(socket);
  }, []);

  if (!socket) return null;

  return (
    <SocketContext.Provider value={socket}>
      <GameContext.Provider value={state}>{children}</GameContext.Provider>
    </SocketContext.Provider>
  );
};

export default SocketProvider;
