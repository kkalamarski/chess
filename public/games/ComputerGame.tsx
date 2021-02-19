import React, { useEffect } from "react";
import Pieces from "../../common/pieces";
import findBestMove from "../../engine/webWorker";
import { timeTickAction } from "../actions/computerGameActions";
import ChessBoard from "../src/components/ChessBoard";
import GameWrapper from "../src/components/GameWrapper";
import {
  useComputerGame,
  usePlayerMove,
  useTurn,
} from "../src/providers/ComputerGameProvider";
const jsChess = require("js-chess-engine");

const ComputerGame = () => {
  const [state, dispatch] = useComputerGame();
  const turn = useTurn();
  const onPlayerMove = usePlayerMove();

  useEffect(() => {
    if (turn !== state.playerColor) {
      (async () => {
        const [from, to] = await findBestMove(state.FEN, 50);

        onPlayerMove(from, to);
      })();
    }
  }, [state.FEN, turn]);

  useEffect(() => {
    const game = jsChess.status(state.FEN);

    if (!game.isFinished && state.whiteTime > 0 && state.blackTime > 0) {
      const blackTime =
        game.turn === Pieces.BLACK ? state.blackTime - 1 : state.blackTime;
      const whiteTime =
        game.turn === Pieces.WHITE ? state.whiteTime - 1 : state.whiteTime;

      const timeoutId = setTimeout(
        () => dispatch(timeTickAction({ blackTime, whiteTime })),
        1000
      );

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [state.FEN, turn, state.whiteTime, state.blackTime]);

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
