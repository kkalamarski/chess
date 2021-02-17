import getPossibleMoves from "./getPossibleMoves";
import minimax from "./minimax";

const jsChess = require("js-chess-engine");

const findBestMove = (FEN: string, depth: number) => {
  const board = jsChess.status(FEN);

  const possibleMoves = getPossibleMoves(FEN);

  console.log(possibleMoves.length, "possible moves");

  console.time("Found AI move in:");
  const evaluatedMoves: [string, string, number][] = possibleMoves.map(
    ([from, to]) => {
      const position = jsChess.move(FEN, from, to);
      const evaluation = minimax(position, depth, -Infinity, Infinity);
      console.log(`Evaluating move ${from} -> ${to} : ${evaluation}`);

      return [from, to, evaluation];
    }
  );

  console.timeEnd("Found AI move in:");
  console.log("Engine depth:", depth);

  const sorted = evaluatedMoves
    .sort(() => Math.random() - Math.random()) // shuffle moves with the same evaluation
    .sort((a, b) => (board.turn === "white" ? b[2] - a[2] : a[2] - b[2]));

  const bestMove = sorted[0];

  console.log(bestMove);

  return bestMove;
};

export default findBestMove;
