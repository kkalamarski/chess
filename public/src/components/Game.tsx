import React from "react";
import styled from "styled-components";
import ChessBoard from "./ChessBoard";
import Sidebar from "./Sidebar";

const GameWrapper = styled.section`
  display: grid;
  margin: 0 auto;
  width: 100%;
  max-width: 950px;
  grid-template-columns: 8fr 4fr;
`;

const Game = () => {
  return (
    <GameWrapper>
      <ChessBoard />
      <Sidebar />
    </GameWrapper>
  );
};

export default Game;
