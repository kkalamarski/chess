import evaluate from "./evaluate";
import getPossibleMoves from "./getPossibleMoves";

type Move = [string, string] | null;

const jsChess = require("js-chess-engine");

const maximize = (
  FEN: string,
  depth: number,
  alpha: number,
  beta: number
): [number, Move] => {
  const game = jsChess.status(FEN);
  let move: Move = null;

  if (depth === 0 || game.isFinished) return [evaluate(FEN), move];

  const moves = getPossibleMoves(FEN);

  for (const [from, to] of moves) {
    const newFEN = jsChess.move(FEN, from, to);
    const [evaluation] = minimize(newFEN, depth - 1, alpha, beta);

    if (!move) move = [from, to];

    if (evaluation >= beta) {
      return [beta, [from, to]];
    }

    if (evaluation > alpha) {
      move = [from, to];
      alpha = evaluation;
    }
  }

  return [alpha, move];
};

const minimize = (
  FEN: string,
  depth: number,
  alpha: number,
  beta: number
): [number, Move] => {
  const game = jsChess.status(FEN);
  let move: Move = null;
  if (depth === 0 || game.isFinished) return [evaluate(FEN), move];

  const moves = getPossibleMoves(FEN);

  for (const [from, to] of moves) {
    const newFEN = jsChess.move(FEN, from, to);
    const [evaluation] = maximize(newFEN, depth - 1, alpha, beta);

    if (!move) move = [from, to];

    if (evaluation <= alpha) return [alpha, [from, to]];

    if (evaluation < beta) {
      move = [from, to];
      beta = evaluation;
    }
  }

  return [beta, move];
};

const minimax = (FEN: string, depth: number): [number, Move] => {
  const board = jsChess.status(FEN);

  const alpha = -Infinity;
  const beta = Infinity;

  if (board.turn === "white") return maximize(FEN, depth, alpha, beta);
  else return minimize(FEN, depth, alpha, beta);
};

export default minimax;
