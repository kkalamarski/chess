import { useGame } from "../providers/SocketProvider";

const usePieces = () => {
  const game = useGame();

  return game?.board?.pieces;
};

export default usePieces;
