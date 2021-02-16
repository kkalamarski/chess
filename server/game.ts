import { Socket } from "socket.io";
import Actions from "../common/actions";
import Pieces from "../common/pieces";

const jsChess = require("js-chess-engine");

const game = (socket: Socket) => {
  const game = new jsChess.Game();
  const pieces = Math.random() > 0.5 ? Pieces.WHITE : Pieces.BLACK;
  let whiteTime = 3 * 60;
  let blackTime = 3 * 60;

  const intervalId = setInterval(() => {
    const { turn, isFinished } = game.exportJson();

    if (isFinished) clearInterval(intervalId);

    if (turn === Pieces.WHITE) {
      whiteTime -= 1;
    } else {
      blackTime -= 1;
    }

    socket.emit(Actions.TIME, { whiteTime, blackTime });
  }, 1000);

  const aiMove = () => {
    game.aiMove(2);
    pieces === Pieces.WHITE ? (blackTime += 3) : (whiteTime += 3);
    socket.emit(Actions.UPDATE_BOARD, game.exportJson());
  };

  socket.emit(Actions.UPDATE_SETTINGS, { pieces });
  socket.emit(Actions.UPDATE_BOARD, game.exportJson());

  if (game.exportJson().turn !== pieces) {
    aiMove();
  }

  socket.on(Actions.MOVE, (from, to) => {
    try {
      game.move(from, to);
      pieces === Pieces.WHITE ? (whiteTime += 3) : (blackTime += 3);
      const g = game.exportJson();
      socket.emit(Actions.UPDATE_BOARD, g);

      if (g.turn !== pieces) {
        aiMove();
      }
    } catch (e) {
      // handle invalid move
    }
  });
};

export default game;
