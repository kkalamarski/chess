const jsChess = require("js-chess-engine");

const getPossibleMoves = (FEN: string) => {
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

  return possibleMoves;
};

export default getPossibleMoves;
