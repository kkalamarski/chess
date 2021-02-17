import minimax from "./minimax";

const jsChess = require("js-chess-engine");

const findBestMove = async (FEN: string, depth: number) => {
  const board = jsChess.status(FEN);
  const moves = jsChess.moves(board);
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

  console.time("Found AI move in:");
  const evaluatedMoves = await Promise.all<[string, string, number]>(
    possibleMoves.map(
      ([from, to]) =>
        new Promise((resolve) => {
          setTimeout(async () => {
            const position = jsChess.move(FEN, from, to);
            const evaluation = await minimax(
              position,
              depth,
              -Infinity,
              Infinity
            );

            resolve([from, to, evaluation]);
          });
        })
    )
  );
  console.timeEnd("Found AI move in:");
  console.log("Engine depth:", depth);

  const sorted = evaluatedMoves
    .sort((a, b) => Math.random() - Math.random()) // shuffle moves with the same evaluation
    .sort((a, b) => (board.turn === "white" ? b[2] - a[2] : a[2] - b[2]));

  return {
    from: sorted?.[0]?.[0],
    to: sorted?.[0]?.[1],
    evaluation: sorted?.[0]?.[2],
  };
};

export default findBestMove;
