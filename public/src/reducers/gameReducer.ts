import Actions from "../../../common/actions";

interface Action {
  type: Actions;
  data: any;
}

const gameReducer = (state: any, action: Action) => {
  console.log(state, action);

  switch (action.type) {
    case Actions.UPDATE_BOARD:
      return { ...state, board: action.data };

    case Actions.UPDATE_SETTINGS:
      return { ...state, settings: action.data };

    default:
      return state;
  }
};

export default gameReducer;
