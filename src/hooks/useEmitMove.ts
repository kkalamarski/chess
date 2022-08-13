import Actions from "../../../common/actions";
import { useSocket } from "../providers/SocketProvider";

const useEmitMove = () => {
  const socket = useSocket();

  return (from: string, to: string) => {
    socket.emit(Actions.MOVE, from, to);
  };
};

export default useEmitMove;
