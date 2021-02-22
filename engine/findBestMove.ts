import minimax from "./minimax";

const findBestMove = (FEN: string, depth: number) => {
  const [evaluation, bestMove] = minimax(FEN, depth);

  return bestMove;
};

export default findBestMove;
