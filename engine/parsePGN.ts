const jsChess = require("js-chess-engine");

export const parseMove = (FEN: string, move: string) => {
  const position = jsChess.status(FEN);

  const exactMove = move.match(/[a-h]\d/g);

  if (exactMove?.length === 2) {
    return [exactMove[0].toUpperCase(), exactMove[1].toUpperCase(), move];
  }

  if (move.includes("O-O-O"))
    return position.turn === "white" ? ["E1", "C1", move] : ["E8", "C8", move];

  if (move.includes("O-O"))
    return position.turn === "white" ? ["E1", "G1", move] : ["E8", "G8", move];

  const [rank] = move.match(/\d/g) ?? [null];
  let [fromFile, toFile] = move.match(/[a-h]/g) ?? [""];
  const [piece] = move.match(/[A-Z]/g) ?? ["P"];

  if (!toFile) {
    toFile = fromFile;
  }

  const to = `${toFile}${rank}`.toUpperCase();

  const fromPossibilities = Object.entries<string>(position.pieces)
    .filter(([_, pieceOnBoard]) => {
      return pieceOnBoard.toUpperCase() === piece;
    })
    .map((p) => p[0])
    .filter((from) => position.moves[from]?.includes(to));

  if (fromPossibilities.length === 1) {
    const [from] = fromPossibilities;

    return [from, to, move];
  }

  let from = fromPossibilities.find((from) =>
    from.includes(fromFile.toUpperCase())
  );

  if (!from && position.enPassant?.toUpperCase() === to) {
    from =
      position.turn === "white"
        ? `${fromFile}${Number(rank) - 1}`
        : `${fromFile}${Number(rank) + 1}`;
  }

  return [from?.toUpperCase(), to.toUpperCase(), move];
};

const parsePGN = (FEN: string, PGN: string) => {
  const movesPGN = PGN.trim()
    .split(" ")
    .filter((move) => !/\d\./.test(move));

  const moves = movesPGN.map((move) => {
    const [from, to] = parseMove(FEN, move);
    try {
      FEN = jsChess.move(FEN, from, to);
    } catch (e) {
      console.log(FEN, from, to, move);
      console.log(movesPGN);
      throw e;
    }

    return [from, to, move, FEN];
  });

  return moves;
};

export default parsePGN;
