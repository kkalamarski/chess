import React, { useEffect } from "react";
import findBestMove from "../../engine/webWorker";
import ChessBoard from "../src/components/ChessBoard";
import GameWrapper from "../src/components/GameWrapper";
import {
  useComputerGame,
  usePlayerMove,
  useTurn,
} from "../src/providers/ComputerGameProvider";

const ComputerGame = () => {
  const [state, dispatch] = useComputerGame();
  const turn = useTurn();
  const onPlayerMove = usePlayerMove();

  useEffect(() => {
    if (turn !== state.playerColor) {
      (async () => {
        const [from, to] = await findBestMove(state.FEN, 10);

        onPlayerMove(from, to);
      })();
    }
  }, [state.FEN, turn]);

  return (
    <GameWrapper>
      <ChessBoard
        FEN={state.FEN}
        playerColor={state.playerColor}
        onMove={onPlayerMove}
      />
    </GameWrapper>
  );
};

export default ComputerGame;
