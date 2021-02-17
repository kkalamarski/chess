import evaluate from "./evaluate";

const jsChess = require("js-chess-engine");

const minimax = async (
  FEN: string,
  depth: number,
  alpha: number,
  beta: number
) => {
  const board = jsChess.status(FEN);

  if (depth === 0 || board.isFinished) return evaluate(FEN, depth);

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

      newAlpha = Math.max(newAlpha, evaluation);
      maxEval = Math.max(maxEval, evaluation);

      if (beta <= newAlpha) break;
    }

    return maxEval;
  } else {
    let minEval = Infinity;
    let newBeta = beta;

    for (const [from, to] of possibleMoves) {
      const newFEN = jsChess.move(FEN, from, to);
      const evaluation = await minimax(newFEN, depth - 1, alpha, newBeta);

      newBeta = Math.min(newBeta, evaluation);
      minEval = Math.min(minEval, evaluation);

      if (newBeta <= alpha) break;
    }

    return minEval;
  }
};

export default minimax;
