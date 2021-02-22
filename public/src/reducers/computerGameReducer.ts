import Pieces from "../../../common/pieces";
import ComputerGameActionTypes from "../../actions/computerGameActions";

export interface ComputerGameState {
  turn: Pieces;
  playerColor: Pieces;
  FEN: string;
  whiteTime: number;
  blackTime: number;
  depth: number;
}

export const defaultState: ComputerGameState = {
  depth: 2,
  whiteTime: 10 * 60,
  blackTime: 10 * 60,
  turn: Pieces.WHITE,
  playerColor: Pieces.WHITE,
  FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // starting position
};

interface Action {
  type: ComputerGameActionTypes;
  data: any;
}

const computerGameReducer = (state: ComputerGameState, action: Action) => {
  switch (action.type) {
    case ComputerGameActionTypes.UPDATE_FEN:
      return { ...state, FEN: action.data };

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
