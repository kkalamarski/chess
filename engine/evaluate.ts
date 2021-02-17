const jsChess = require("js-chess-engine");

const Values: { [x: string]: number } = {
  p: 10,
  n: 30,
  b: 30,
  r: 50,
  q: 90,
  k: 9000,
};

const evaluate = (FEN: string, depth: number): number => {
  const { pieces, check, checkMate, turn } = jsChess.status(FEN);

  const blackPieces = Object.values<string>(pieces).filter((piece) =>
    /[a-z]/.test(piece)
  );
  const whitePieces = Object.values<string>(pieces).filter((piece) =>
    /[A-Z]/.test(piece)
  );

  let bonus = 0;

  if (check) {
    bonus += 20 * depth + 1;
  }

  if (checkMate) {
    bonus += 10000 * depth + 1;
  }

  const blackPoints = blackPieces.reduce(
    (total, piece) => total + Values[piece.toLowerCase()],
    0
  );

  const whitePoints = whitePieces.reduce(
    (total, piece) => total + Values[piece.toLowerCase()],
    0
  );

  if (turn === "black") bonus *= -1;

  return whitePoints - blackPoints + bonus;
};

export default evaluate;
