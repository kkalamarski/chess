import { useGame } from "../providers/SocketProvider";

const useGameSettings = () => {
  const game = useGame();

  return game?.settings;
};

export default useGameSettings;
