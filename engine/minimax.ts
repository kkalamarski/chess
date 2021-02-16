import evaluate from "./evaluate";

const jsChess = require("js-chess-engine");

const minimax = async (
  FEN: string,
  depth: number,
  alpha: number,
  beta: number
) => {
  if (depth === 0) return evaluate(FEN);

  const board = jsChess.status(FEN);
  const moves = jsChess.moves(FEN);
  const startingPoints = Object.keys(moves);

  const possibleMoves = startingPoints.reduce(
    (all: [string, string][], current: string) => {
      const movesFromThisPosition = moves[current].map((move: string) => [
        current,
        move,
      ]);

      return [...all, ...movesFromThisPosition];
    },
    []
  );

  if (board.turn === "white") {
    let maxEval = -Infinity;
    let newAlpha = alpha;

    for (const [from, to] of possibleMoves) {
      const newFEN = jsChess.move(FEN, from, to);
      const evaluation = await minimax(newFEN, depth - 1, newAlpha, beta);
      newAlpha = Math.max(alpha, evaluation);

      if (beta <= newAlpha) break;

      maxEval = Math.max(maxEval, evaluation);
    }

    return maxEval;
  } else {
    let minEval = Infinity;
    let newBeta = beta;

    for (const [from, to] of possibleMoves) {
      const newFEN = jsChess.move(FEN, from, to);
      const evaluation = await minimax(newFEN, depth - 1, alpha, newBeta);
      newBeta = Math.min(beta, evaluation);

      if (newBeta <= alpha) break;

      minEval = Math.min(minEval, evaluation);
    }

    return minEval;
  }
};

export default minimax;
