import React from "react";
import styled from "styled-components";
import Pieces from "../../../common/pieces";
import { useComputerGame } from "../providers/ComputerGameProvider";
import { useGame } from "../providers/SocketProvider";
import Timer from "./Timer";

const jsChess = require("js-chess-engine");

const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;

  font-size: 3rem;
  color: white;
`;

const Sidebar = () => {
  const [state, dispatch] = useComputerGame();
  const game = jsChess.status(state.FEN);

  const computerTime =
    state.playerColor === Pieces.WHITE ? state.blackTime : state.whiteTime;
  const playerTime =
    state.playerColor === Pieces.BLACK ? state.blackTime : state.whiteTime;

  return (
    <SidebarWrapper>
      {!!computerTime && (
        <Timer
          active={game.turn !== state.playerColor}
          low={computerTime < 60}
          time={computerTime}
        />
      )}
      <hr style={{ width: "100%" }} />
      {!!playerTime && (
        <Timer
          active={game.turn === state.playerColor}
          low={playerTime < 60}
          time={playerTime}
        />
      )}
    </SidebarWrapper>
  );
};

export default Sidebar;
