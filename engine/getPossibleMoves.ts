const jsChess = require("js-chess-engine");

const Values: { [x: string]: number } = {
  p: 10,
  n: 30,
  b: 30,
  r: 50,
  q: 90,
  k: 9000,
};

const getPossibleMoves = (FEN: string) => {
  const moves = jsChess.moves(FEN);
  const board = jsChess.status(FEN);
  const isWhite = board.turn === "white";
  const pieces = board.pieces;
  const startingPoints = Object.keys(moves);

  const possibleMoves = startingPoints
    .reduce((all: [string, string][], current: string) => {
      const movesFromThisPosition = moves[current].map((move: string) => [
        current,
        move,
      ]);

      return [...all, ...movesFromThisPosition];
    }, [])
    .sort((a, b) => {
      // captures first
      const captureA = pieces[a[1]]?.toLowerCase();
      const captureB = pieces[b[1]]?.toLowerCase();

      const valueA = Values[captureA] || 0;
      const valueB = Values[captureB] || 0;

      return valueB - valueA;
    });

  return possibleMoves;
};

export default getPossibleMoves;
