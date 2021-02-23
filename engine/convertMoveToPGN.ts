const jsChess = require("js-chess-engine");

const convertMoveToPGN = (FEN: string, from: string, to: string) => {
  const board = jsChess.status(FEN);
  const pieces = board.pieces;

  const capture = pieces[to.toUpperCase()] ? "x" : "";
  let piece = pieces[from.toUpperCase()].toUpperCase();
  let fromFile = "";

  const possibleConflicts = Object.entries<[string, string[]]>(board.moves)
    .filter(([f, t]) => t.includes(to.toUpperCase()))
    .filter(([f]) => f.toUpperCase() !== from.toUpperCase())
    .filter(([f]) => pieces[f.toUpperCase()].toUpperCase() === piece);

  if (possibleConflicts.length) fromFile = from[0].toLowerCase();

  if (piece === "P") piece = "";

  const newFEN = jsChess.move(FEN, from, to);
  const boardAfterMove = jsChess.status(newFEN);

  const check = boardAfterMove.checkMate
    ? "#"
    : boardAfterMove.check
    ? "+"
    : "";

  return piece + fromFile + capture + to.toLowerCase() + check;
};

export const convertGameToPGN = (FEN: string, moves: [string, string][]) => {
  let pgn = "";
  let index = 0;

  for (const [from, to] of moves) {
    const position = jsChess.status(FEN);
    const moveNumber = index % 2 !== 0 ? "" : position.fullMove + ". ";

    pgn += moveNumber + convertMoveToPGN(FEN, from, to) + " ";

    FEN = jsChess.move(FEN, from, to);

    index++;
  }

  return pgn;
};

export default convertMoveToPGN;
