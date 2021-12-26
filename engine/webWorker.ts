const findBestMove = async (
  FEN: string,
  depth: number
): Promise<[string, string, number]> => {
  const worker = new Worker(new URL("./index.ts", import.meta.url), {
    type: "module",
  });

  const bestMove = await new Promise<[string, string, number]>((resolve) => {
    worker.addEventListener("message", (message: any) => {
      resolve(message.data);
    });

    worker.postMessage([FEN, depth]);
  });

  worker.terminate();

  return bestMove;
};

export default findBestMove;
