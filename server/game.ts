import { Socket } from "socket.io";
import Actions from "../common/actions";
import Pieces from "../common/pieces";
import findBestMove from "../engine/findBestMove";
import { fork } from "child_process";

const jsChess = require("js-chess-engine");

const game = async (socket: Socket) => {
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

  const getDepthLevel = (time: number): number => {
    if (time > 2 * 60) {
      return 5;
    } else if (time > 1.5 * 60) {
      return 3;
    }

    return 2;
  };

  const aiMove = async () => {
    if (game.exportJson().isFinished) return;

    const isWhite = pieces === Pieces.WHITE;
    const engine = fork("./engine/index.ts");

    engine.send([
      game.exportFEN(),
      getDepthLevel(isWhite ? whiteTime : blackTime),
    ]);

    const bestMove = await new Promise<any>((resolve) => {
      engine.on("message", (bestMove) => resolve(bestMove));
    });

    game.move(bestMove.from, bestMove.to);

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
