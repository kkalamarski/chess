import convertMoveToPGN, { convertGameToPGN } from "./convertMoveToPGN";

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe("Move to PGN", () => {
  it("pawn move", () => {
    const pgn = convertMoveToPGN(STARTING_FEN, "D2", "D3");

    expect(pgn).toBe("d3");
  });

  it("knight move", () => {
    const pgn = convertMoveToPGN(STARTING_FEN, "G1", "F3");

    expect(pgn).toBe("Nf3");
  });

  it("should specify which knight has moved", () => {
    const pgn = convertMoveToPGN("k7/8/8/8/2N3N1/8/8/K7 w - - 0 1", "C4", "E5");

    expect(pgn).toBe("Nce5");
  });

  it("should specify capture", () => {
    const pgn = convertMoveToPGN("3q4/8/8/8/8/8/8/3Q4 w - - 0 1", "D1", "D8");

    expect(pgn).toBe("Qxd8");
  });

  it("should specify check", () => {
    const pgn = convertMoveToPGN("k2q4/8/8/8/8/8/8/K2Q4 w - - 0 1", "D1", "D8");

    expect(pgn).toBe("Qxd8+");
  });

  it("should specify checkmate", () => {
    const pgn = convertMoveToPGN("k7/8/8/8/8/8/1Q6/6RK w - - 0 1", "G1", "A1");

    expect(pgn).toBe("Ra1#");
  });
});

describe("Game to PGN", () => {
  it("should convert moves to PGN", () => {
    // prettier-ignore
    const moves: [string, string][] = [["e2","E4"],["B8","C6"],["f1","C4"],["G8","F6"],["d1","H5"],["F6","H5"],["d2","D3"],["E7","E5"],["c4","F7"]]

    const pgn = convertGameToPGN(STARTING_FEN, moves);

    expect(typeof pgn).toBe("string");
    expect(pgn).toContain("1.");
    expect(pgn).toContain("1. e4");
    expect(pgn).toContain("1. e4 Nc6");

    // captures
    expect(pgn).toContain("Nxh5");

    // check
    expect(pgn).toContain("Bxf7+");
  });
});
