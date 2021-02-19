import React from "react";
import styled from "styled-components";
import ChessBoard from "./ChessBoard";
import GameWrapper from "./GameWrapper";
import Moves from "./Moves";
import Sidebar from "./Sidebar";

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
