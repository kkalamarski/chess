import React from "react";
import styled from "styled-components";
import Pieces from "../../../common/pieces";
import { useGame } from "../providers/SocketProvider";
import ChessBoard from "./ChessBoard";

const SidebarWrapper = styled.aside`
  display: flex;
  border: 1px black solid;
  flex-direction: column;
  justify-content: space-between;
`;

const Sidebar = () => {
  const game = useGame();

  const playerPieces = game?.settings?.pieces;
  const computerPieces =
    playerPieces === Pieces.WHITE ? Pieces.BLACK : Pieces.WHITE;

  console.log(game);
  return (
    <SidebarWrapper>
      <div>Computer ({computerPieces} pieces)</div>
      <div>{game?.board?.turn} turn</div>
      <div>Player ({playerPieces} pieces)</div>
    </SidebarWrapper>
  );
};

export default Sidebar;
