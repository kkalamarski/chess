import captureEvaluation from "./captureEvaluation";
import getPossibleMoves from "./getPossibleMoves";
import minimax from "./minimax";

const jsChess = require("js-chess-engine");

const findBestMove = (FEN: string, depth: number) => {
  const board = jsChess.status(FEN);

  const possibleMoves = getPossibleMoves(FEN);

  const alphaBeta = { alpha: -Infinity, beta: Infinity };
  const evaluatedMoves: [string, string, number][] = possibleMoves
    .sort(
      (move1, move2) =>
        captureEvaluation(FEN, move1[0], move1[1]) -
        captureEvaluation(FEN, move2[0], move2[1])
    )
    .map(([from, to]) => {
      const position = jsChess.move(FEN, from, to);
      const evaluation = minimax(position, depth, alphaBeta);

      return [from, to, evaluation];
    });

  const sorted = evaluatedMoves.sort((a, b) =>
    board.turn === "white" ? b[2] - a[2] : a[2] - b[2]
  );

  const bestMove = sorted[0];

  return bestMove;
};

export default findBestMove;
