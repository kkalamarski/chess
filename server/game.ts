import Actions from "../common/actions";
import { Socket } from "socket.io";
import Pieces from "../common/pieces";
import { fork } from "child_process";

const jsChess = require("js-chess-engine");

const game = async (socket: Socket) => {
  const game = new jsChess.Game();
  const pieces = Math.random() > 0.5 ? Pieces.WHITE : Pieces.BLACK;
  let whiteTime = 5 * 60;
  let blackTime = 5 * 60;

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

  const getDepthLevel = (time: number): number => {
    return 3;
  };

  const aiMove = async () => {
    const board = game.exportJson();
    const isWhite = pieces === Pieces.WHITE;
    const engine = fork("./engine/index.ts");

    if (!board.isFinished) {
      engine.send([
        game.exportFEN(),
        getDepthLevel(isWhite ? whiteTime : blackTime),
      ]);

      const [from, to, evaluation] = await new Promise<any>((resolve) => {
        engine.on("message", (bestMove) => resolve(bestMove));
      });

      console.log(from, to, evaluation);
      game.move(from, to);
    }

    isWhite ? (blackTime += 3) : (whiteTime += 3);
    socket.emit(Actions.UPDATE_BOARD, game.exportJson());
  };

  socket.emit(Actions.UPDATE_SETTINGS, { pieces });
  socket.emit(Actions.UPDATE_BOARD, game.exportJson());

  if (game.exportJson().turn !== pieces) {
    await aiMove();
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
