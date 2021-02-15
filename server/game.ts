import { Socket } from "socket.io";
import Actions from "../common/actions";
import Pieces from "../common/pieces";

const jsChess = require("js-chess-engine");

const game = (socket: Socket) => {
  const game = new jsChess.Game();
  const pieces = Math.random() > 0.5 ? Pieces.WHITE : Pieces.BLACK;

  const aiMove = () => {
    game.aiMove(3);
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
