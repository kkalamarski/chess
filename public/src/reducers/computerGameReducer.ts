import Pieces from "../../../common/pieces";
import ComputerGameActionTypes from "../../actions/computerGameActions";

export interface ComputerGameState {
  turn: Pieces;
  playerColor: Pieces;
  FEN: string;
}

export const defaultState: ComputerGameState = {
  turn: Pieces.WHITE,
  playerColor: Pieces.WHITE,
  FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // starting position
};

interface Action {
  type: ComputerGameActionTypes;
  data: any;
}

const computerGameReducer = (state: ComputerGameState, action: Action) => {
  console.log(state, action);

  switch (action.type) {
    case ComputerGameActionTypes.UPDATE_FEN:
      return { ...state, FEN: action.data };

    default:
      return state;
  }
};

export default computerGameReducer;
