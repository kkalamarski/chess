import React from "react";
import styled from "styled-components";
import Pieces from "../../../common/pieces";
import { useGame } from "../providers/SocketProvider";

const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;

  font-size: 3rem;
  color: white;
`;

const Timer = styled.div<{ active: boolean; low: boolean }>`
  color: ${(p) => (!p.active ? "#dddddd" : p.low ? "red" : "green")};
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
        <Timer active={turn !== playerPieces} low={computerTime < 60}>
          {Math.floor(computerTime / 60) + ":" + (computerTime % 60)}
        </Timer>
      )}
      <hr style={{ width: "100%" }} />
      {!!playerTime && (
        <Timer active={turn === playerPieces} low={playerTime < 60}>
          {Math.floor(playerTime / 60) + ":" + (playerTime % 60)}
        </Timer>
      )}
    </SidebarWrapper>
  );
};

export default Sidebar;
