import getPossibleMoves from "./getPossibleMoves";
import minimax from "./minimax";

const jsChess = require("js-chess-engine");

const findBestMove = (FEN: string, depth: number) => {
  const board = jsChess.status(FEN);

  const possibleMoves = getPossibleMoves(FEN);

  console.log(possibleMoves.length, "possible moves");

  console.time("Found AI move in:");
  const alphaBeta = { alpha: -Infinity, beta: Infinity };
  const evaluatedMoves: [string, string, number][] = possibleMoves.map(
    ([from, to]) => {
      const position = jsChess.move(FEN, from, to);

      console.time(`${from} -> ${to}`);
      const evaluation = minimax(position, depth, alphaBeta);

      console.timeEnd(`${from} -> ${to}`);
      console.log(
        `Evaluating move ${from} -> ${to} : ${evaluation} [${alphaBeta.alpha}:${alphaBeta.beta}]`
      );

      return [from, to, evaluation];
    }
  );

  console.timeEnd("Found AI move in:");
  console.log("Engine depth:", depth);

  const sorted = evaluatedMoves.sort((a, b) =>
    board.turn === "white" ? b[2] - a[2] : a[2] - b[2]
  );

  const bestMove = sorted[0];

  console.log("Best 5 moves:");
  console.log(
    sorted
      .slice(0, 5)
      .map(([from, to, evaluation]) => `${from} -> ${to}: ${evaluation}`)
  );

  return bestMove;
};

export default findBestMove;
