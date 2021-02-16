import React from "react";
import styled from "styled-components";
import ChessBoard from "./ChessBoard";
import Moves from "./Moves";
import Sidebar from "./Sidebar";

const GameWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #1c1c1c;

  width: 100vw;
  height: 100vh;
`;

const Game = () => {
  return (
    <GameWrapper>
      <Moves />
      <ChessBoard />
      <Sidebar />
    </GameWrapper>
  );
};

export default Game;
