import React from "react";
import styled from "styled-components";
import Pieces from "../../../common/pieces";
import { useGame } from "../providers/SocketProvider";
import Timer from "./Timer";

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
  const game = useGame();
  const playerPieces = game?.settings?.pieces;
  const turn = game?.board?.turn;

  const computerTime =
    playerPieces === Pieces.WHITE ? game?.blackTime : game?.whiteTime;
  const playerTime =
    playerPieces === Pieces.BLACK ? game?.blackTime : game?.whiteTime;

  return (
    <SidebarWrapper>
      {!!computerTime && (
        <Timer
          active={turn !== playerPieces}
          low={computerTime < 60}
          time={computerTime}
        />
      )}
      <hr style={{ width: "100%" }} />
      {!!playerTime && (
        <Timer
          active={turn === playerPieces}
          low={playerTime < 60}
          time={playerTime}
        />
      )}
    </SidebarWrapper>
  );
};

export default Sidebar;
