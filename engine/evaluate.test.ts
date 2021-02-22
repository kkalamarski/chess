import evaluate from "./evaluate";

describe("Evaluate function", () => {
  test("should return a positive number if white position is better", () => {
    const FEN = "4k3/8/8/8/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1";

    const evaluation = evaluate(FEN);

    expect(evaluation).toBeGreaterThan(0);
  });

  test("should return a negative number if black position is better", () => {
    const FEN = "5q1k/4r3/8/8/3K4/8/8/8 w - - 0 1";

    const evaluation = evaluate(FEN);

    expect(evaluation).toBeLessThan(0);
  });

  test("should return zero if position is equal", () => {
    const FEN = "6qk/8/8/8/8/8/8/KQ6 w - - 0 1";

    const evaluation = evaluate(FEN);

    expect(evaluation).toBe(0);
  });

  test("should return zero if is stalemate", () => {
    const FEN = "6qk/8/8/8/8/8/8/KQ6 w - - 0 1";

    const evaluation = evaluate(FEN);

    expect(evaluation).toBe(0);
  });

  test("should return Infinity if white has checkmated", () => {
    const FEN = "7k/6Q1/6K1/8/8/8/8/8 b - - 1 1";

    const evaluation = evaluate(FEN);

    expect(evaluation).toBe(Infinity);
  });

  test("should return negative Infinity if black has checkmated", () => {
    const FEN = "4k3/8/8/8/8/8/4q2r/4K3 w - - 0 1";

    const evaluation = evaluate(FEN);

    expect(evaluation).toBe(-Infinity);
  });
});
