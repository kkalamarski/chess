import findBestMove from "./findBestMove";

process.on("message", async ([FEN, depth]: [string, number]) => {
  const bestMove = await findBestMove(FEN, depth);

  // @ts-ignore
  process?.send(bestMove);
  process.disconnect();
});
