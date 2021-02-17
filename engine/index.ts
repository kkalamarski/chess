import evaluate from "./evaluate";
import findBestMove from "./findBestMove";

process.on("message", ([FEN, depth]: [string, number]) => {
  const evaluation = evaluate(FEN, 0);
  const bestMove = findBestMove(FEN, depth);

  console.log(bestMove);

  // @ts-ignore
  process?.send(bestMove);
  process.disconnect();
});
