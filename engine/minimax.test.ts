import minimax from "./minimax";

describe("Minimax function", () => {
  test("should return negative Infinity if checkmate is unavoidable for white", () => {
    const FEN = "5k2/6r1/8/8/8/8/1q6/7K b - - 2 2";
    const [evaluation] = minimax(FEN, 3);

    expect(evaluation).toBe(-Infinity);
  });

  test("should return positive Infinity if checkmate is unavoidable for black", () => {
    const FEN = "7k/8/8/8/8/8/2Q5/K5R1 w - - 2 2";
    const [evaluation] = minimax(FEN, 3);

    expect(evaluation).toBe(Infinity);
  });

  test("should find mate in one", () => {
    const FEN = "6k1/8/8/8/8/8/5Q2/K5R1 b - - 2 2";

    const [evaluation, bestMove] = minimax(FEN, 3);
    expect(evaluation).toBe(Infinity);
    expect(bestMove).toEqual(["G8", "H8"]);
  });
});
