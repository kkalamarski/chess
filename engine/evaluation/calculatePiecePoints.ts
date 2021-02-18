const Values: { [x: string]: number } = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

const calculatePiecePoints = (pieces: { [x: string]: string }) => {
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

export default calculatePiecePoints;
