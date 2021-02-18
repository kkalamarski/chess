import calculatePiecePositionBonus from "./calculatePiecePositionBonus";

const jsChess = require("js-chess-engine");

describe("Piece position calculation bonus", () => {
  test("A knight positioned correctly should receive a bonus points (white)", () => {
    const FEN = "8/8/8/8/3N4/8/8/8 w - - 0 1";
    const board = jsChess.status(FEN);

    const result = calculatePiecePositionBonus(board.pieces);

    expect(result).toBe(20);
  });

  test("A knight positioned correctly should receive a bonus points (black)", () => {
    const FEN = "8/8/8/8/3n4/8/8/8 w - - 0 1";
    const board = jsChess.status(FEN);

    const result = calculatePiecePositionBonus(board.pieces);

    expect(result).toBe(-20);
  });

  test("Advanced pawn will get more bonus points (white)", () => {
    const initialBoard = jsChess.status("8/8/8/8/8/8/4P3/8 w - - 0 1");
    const advancedBoard = jsChess.status("8/4P3/8/8/8/8/8/8 w - - 0 1");

    const advancedResult = calculatePiecePositionBonus(advancedBoard.pieces);
    const initialResult = calculatePiecePositionBonus(initialBoard.pieces);

    expect(advancedResult).toBeGreaterThan(initialResult);
  });

  test("Advanced pawn will get more bonus points (black)", () => {
    const initialBoard = jsChess.status("8/4p3/8/8/8/8/8/8 b - - 0 1");
    const advancedBoard = jsChess.status("8/8/8/8/8/8/4p3/8 b - - 0 1");

    const initialResult = calculatePiecePositionBonus(initialBoard.pieces);
    const advancedResult = calculatePiecePositionBonus(advancedBoard.pieces);

    expect(advancedResult).toBeLessThan(initialResult);
  });
});
