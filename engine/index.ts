import findBestMove from "./findBestMove";

process.on("message", async ([FEN, depth]: [string, number]) => {
  const bestMove = await findBestMove(FEN, depth);

  // @ts-ignore
  process?.send(bestMove);
  process.disconnect();
});

addEventListener("message", async ({ data: [FEN, depth] }) => {
  const bestMove = await findBestMove(FEN, depth);

  // @ts-ignore
  postMessage(bestMove);
});
