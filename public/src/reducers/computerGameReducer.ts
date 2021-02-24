import Pieces from "../../../common/pieces";
import { convertGameToPGN } from "../../../engine/convertMoveToPGN";
import ComputerGameActionTypes from "../../actions/computerGameActions";

export interface ComputerGameState {
  turn: Pieces;
  playerColor: Pieces;
  FEN: string;
  startingFEN: string;
  PGN: string;
  whiteTime: number;
  blackTime: number;
  depth: number;
  moves: [string, string][];
}

export const defaultState: ComputerGameState = {
  depth: 2,
  whiteTime: 10 * 60,
  blackTime: 10 * 60,
  turn: Pieces.WHITE,
  playerColor: Math.random() > 0.5 ? Pieces.WHITE : Pieces.BLACK,
  PGN: "",
  FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // starting position
  startingFEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // starting position
  moves: [],
};

interface Action {
  type: ComputerGameActionTypes;
  data: any;
}

const computerGameReducer = (state: ComputerGameState, action: Action) => {
  switch (action.type) {
    case ComputerGameActionTypes.SET_ENGINE_DEPTH:
      return { ...state, depth: action.data };

    case ComputerGameActionTypes.UPDATE_FEN:
      return { ...state, FEN: action.data };

    case ComputerGameActionTypes.RESTART:
      return defaultState;

    case ComputerGameActionTypes.CHANGE_SIDES:
      return {
        ...state,
        playerColor:
          state.playerColor === Pieces.WHITE ? Pieces.BLACK : Pieces.WHITE,
      };

    case ComputerGameActionTypes.REGISTER_MOVE:
      const moves = [...state.moves, action.data];
      const PGN = convertGameToPGN(state.startingFEN, moves);

      console.log(JSON.stringify(PGN));
      return { ...state, moves, PGN };

    case ComputerGameActionTypes.TIME:
      return {
        ...state,
        whiteTime: action.data.whiteTime,
        blackTime: action.data.blackTime,
      };

    default:
      return state;
  }
};

export default computerGameReducer;
