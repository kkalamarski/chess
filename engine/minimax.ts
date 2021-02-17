import evaluate from "./evaluate";
import getPossibleMoves from "./getPossibleMoves";

const jsChess = require("js-chess-engine");

const cache: { [x: string]: number } = {};

const maxi = (FEN: string, depth: number, alpha: number, beta: number) => {
  if (depth === 0) return evaluate(FEN, 0);
  let maxEval = -Infinity;

  const moves = getPossibleMoves(FEN);

  for (const [from, to] of moves) {
    const newFEN = jsChess.move(FEN, from, to);
    let evaluation;

    if (cache[newFEN] !== undefined) {
      evaluation = cache[newFEN];
    } else {
      evaluation = mini(newFEN, depth - 1, alpha, beta);
      cache[newFEN] = evaluation;
    }

    alpha = Math.max(alpha, evaluation);
    maxEval = Math.max(maxEval, evaluation);

    if (beta <= alpha) {
      break;
    }
  }

  return maxEval;
};

const mini = (FEN: string, depth: number, alpha: number, beta: number) => {
  if (depth === 0) return -evaluate(FEN, 0);
  let minEval = Infinity;

  const moves = getPossibleMoves(FEN);

  for (const [from, to] of moves) {
    const newFEN = jsChess.move(FEN, from, to);

    let evaluation;

    if (cache[newFEN] !== undefined) {
      evaluation = cache[newFEN];
    } else {
      evaluation = maxi(newFEN, depth - 1, alpha, beta);
      cache[newFEN] = evaluation;
    }

    beta = Math.min(beta, evaluation);
    minEval = Math.min(minEval, evaluation);

    if (beta <= alpha) {
      break;
    }
  }

  return minEval;
};

const minimax = (FEN: string, depth: number, alpha: number, beta: number) => {
  const board = jsChess.status(FEN);

  if (board.turn === "white") return maxi(FEN, depth, alpha, beta);
  else return mini(FEN, depth, alpha, beta);
};

export default minimax;
