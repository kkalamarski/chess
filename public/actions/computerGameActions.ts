enum ComputerGameActionTypes {
  UPDATE_FEN = "UPDATE_FEN",
  TIME = "TIME",
}

export const updateFENAction = (FEN: string) => ({
  type: ComputerGameActionTypes.UPDATE_FEN,
  data: FEN,
});

export const timeTickAction = (times: {
  whiteTime: number;
  blackTime: number;
}) => ({
  type: ComputerGameActionTypes.TIME,
  data: times,
});

export default ComputerGameActionTypes;
