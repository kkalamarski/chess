const jsChess = require("js-chess-engine");

const Values: { [x: string]: number } = {
  p: 10,
  n: 30,
  b: 30,
  r: 50,
  q: 90,
  k: 9000,
};

const evaluate = (FEN: string): number => {
  const { pieces } = jsChess.status(FEN);

  const blackPieces = Object.values<string>(pieces).filter((piece) =>
    /[a-z]/.test(piece)
  );
  const whitePieces = Object.values<string>(pieces).filter((piece) =>
    /[A-Z]/.test(piece)
  );

  const blackPoints = blackPieces.reduce(
    (total, piece) => total + Values[piece.toLowerCase()],
    0
  );

  const whitePoints = whitePieces.reduce(
    (total, piece) => total + Values[piece.toLowerCase()],
    0
  );

  return whitePoints - blackPoints;
};

export default evaluate;
