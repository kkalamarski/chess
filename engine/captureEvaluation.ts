const jsChess = require("js-chess-engine");

const Values: { [x: string]: number } = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

const captureEvaluation = (FEN: string, from: string, to: string) => {
  const board = jsChess.status(FEN);
  const pieceCapturing = board.pieces[from] ?? "";
  const pieceTaken = board.pieces[to] ?? "";

  const pieceCapturingValue = Values[pieceCapturing.toLowerCase()];
  const pieceTakenValue = Values[pieceTaken.toLowerCase()] ?? 0;

  return pieceCapturingValue >= pieceTakenValue
    ? pieceTakenValue
    : pieceTakenValue * 2;
};

export default captureEvaluation;
