import React from "react";
import styled from "styled-components";
import { useGame } from "../providers/SocketProvider";

const MovesWrapper = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;

  font-size: 3rem;
  color: white;
`;

const Moves = () => {
  const game = useGame();

  console.log(game?.board?.check, "Check!");
  console.log(game?.board?.checkMate, "Checkmate!");

  return (
    <MovesWrapper>
      {game?.board?.check && !game?.board?.checkMate && "Check!"}
      {game?.board?.checkMate && "Checkmate!"}
    </MovesWrapper>
  );
};

export default Moves;
