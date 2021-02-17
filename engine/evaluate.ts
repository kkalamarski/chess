import calculatePiecePositionBonus from "./evaluation/calculatePiecePositionBonus";

const jsChess = require("js-chess-engine");

const Values: { [x: string]: number } = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 200,
};

const evaluate = (FEN: string, depth: number): number => {
  const { pieces } = jsChess.status(FEN);

  const blackPieces = Object.values<string>(pieces).filter((piece) =>
    /[a-z]/.test(piece)
  );
  const whitePieces = Object.values<string>(pieces).filter((piece) =>
    /[A-Z]/.test(piece)
  );

  const positionBonus = calculatePiecePositionBonus(pieces);

  const blackPoints = blackPieces.reduce(
    (total, piece) => total + Values[piece.toLowerCase()],
    0
  );

  const whitePoints = whitePieces.reduce(
    (total, piece) => total + Values[piece.toLowerCase()],
    0
  );

  return whitePoints - blackPoints + positionBonus;
};

export default evaluate;
