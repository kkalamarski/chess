import evaluate from "./evaluate";
import findBestMove from "./findBestMove";

process.on("message", async ([FEN, depth]: [string, number]) => {
  const evaluation = evaluate(FEN, 0);
  const bestMove = await findBestMove(FEN, depth);

  console.log("Current evaluation:", evaluation);

  // @ts-ignore
  process?.send(bestMove);
  process.disconnect();
});
