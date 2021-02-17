import evaluate from "./evaluate";
import getPossibleMoves from "./getPossibleMoves";

interface AlphaBeta {
  alpha: number;
  beta: number;
}

const jsChess = require("js-chess-engine");

const cache: { [x: string]: number } = {};

const maximize = (FEN: string, depth: number, alphaBeta: AlphaBeta) => {
  if (depth === 0) return evaluate(FEN, 0);
  let maximumUtility = -Infinity;

  const moves = getPossibleMoves(FEN);

  for (const [from, to] of moves) {
    const newFEN = jsChess.move(FEN, from, to);
    const evaluation = minimize(newFEN, depth - 1, alphaBeta);

    alphaBeta.alpha = Math.max(alphaBeta.alpha, evaluation);
    maximumUtility = Math.max(maximumUtility, evaluation);

    if (alphaBeta.beta <= alphaBeta.alpha) {
      break;
    }
  }

  return maximumUtility;
};

const minimize = (FEN: string, depth: number, alphaBeta: AlphaBeta) => {
  if (depth === 0) return evaluate(FEN, 0);
  let minimumUtility = Infinity;

  const moves = getPossibleMoves(FEN);

  for (const [from, to] of moves) {
    const newFEN = jsChess.move(FEN, from, to);
    const evaluation = maximize(newFEN, depth - 1, alphaBeta);

    alphaBeta.beta = Math.min(alphaBeta.beta, evaluation);
    minimumUtility = Math.min(minimumUtility, evaluation);

    if (alphaBeta.beta <= alphaBeta.alpha) {
      break;
    }
  }

  return minimumUtility;
};

const minimax = (FEN: string, depth: number, alphaBeta: AlphaBeta) => {
  const board = jsChess.status(FEN);

  if (board.turn === "white") return maximize(FEN, depth, alphaBeta);
  else return minimize(FEN, depth, alphaBeta);
};

export default minimax;
