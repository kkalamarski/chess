enum ComputerGameActionTypes {
  UPDATE_FEN = "UPDATE_FEN",
}

export const updateFENAction = (FEN: string) => ({
  type: ComputerGameActionTypes.UPDATE_FEN,
  data: FEN,
});

export default ComputerGameActionTypes;
