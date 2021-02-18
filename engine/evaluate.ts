import calculatePiecePoints from "./evaluation/calculatePiecePoints";
import calculatePiecePositionBonus from "./evaluation/calculatePiecePositionBonus";

const jsChess = require("js-chess-engine");

const evaluate = (FEN: string, depth: number): number => {
  const { pieces, turn, checkMate, moves } = jsChess.status(FEN);

  if (checkMate) return turn === "white" ? Infinity : -Infinity;

  if (moves.length === 0) return 0;

  const piecePoints = calculatePiecePoints(pieces);
  const positionBonus = calculatePiecePositionBonus(pieces);

  return piecePoints + positionBonus;
};

export default evaluate;
