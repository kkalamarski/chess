import parsePGN, { parseMove } from "./parsePGN";
// prettier-ignore
const TEST_PGN = "1. e3 Nc6 2. d4 Nf6 3. Bd3 d5 4. b3 h6 5. Bb2 Kd7 6. Nf3 Kd6 7. Nh4 Be6 8. Nf5+ Bxf5 9. Bxf5 Rb8 10. Qf3 e5 11. xe5+ Nxe5 12. Qf4 Be7 13. e4 Nxe4 14. Bxe4 xe4 15. Qxe4 Bf6 16. Qd4+ Ke6 17. Qd1 Qxd1+ 18. Kxd1 Rbd8+ 19. Nd2 Rxd2+ 20. Kxd2 Rd8+ 21. Ke2 Kd5 22. Rhd1+ Nd3 23. Rxd3+ Bd4 24. Rxd4+ Ke5 25. Rxd8+ Ke4 26. Re1 g5 27. Kf1+ Kf4 28. g3+ Kf3 29. Re3+ Kg4 30. Kg2 a6 31. Re4+ Kf5 32. Rde8 a5 33. Ree5+ Kf6 34. Re7+ Kf5 35. f3 a4 36. Rxf7+ Kg6 37. Ree7 xb3 38. axb3 g4 39. f4 b5 40. Rg7+ Kf5 41. Kf2 c5 42. Ke3 b4 43. Kd3 c4+ 44. Kxc4 h5 45. Kd5 h4 46. Kd6 xg3 47. xg3"
const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const jsChess = require("js-chess-engine");

describe("parse PGN", () => {
  it("should return an array with moves", () => {
    const moves = parsePGN(STARTING_FEN, TEST_PGN);

    expect(Array.isArray(moves)).toBe(true);
    expect(moves.length).toBe(93);
  });
});

describe("parse move edgecases", () => {
  it("should parse pawn captures", () => {
    const [from, to] = parseMove(
      "rn1qk2r/pp3ppp/2pbpn2/3p4/3PP1b1/2PB4/PPQN1PPP/R1B1K1NR b KQkq - 0 7",
      "dxe4"
    );

    expect(from).toBe("D5");
    expect(to).toBe("E4");
  });

  it("should parse en passant", () => {
    const [from, to] = parseMove(
      "n1qk2r/pbp1nppp/1p2p3/3pP3/1bBP4/2N2N2/PPP2PPP/R1BQK2R w KQkq d6 0 7",
      "exd6"
    );

    expect(from).toBe("E5");
    expect(to).toBe("D6");

    jsChess.move(
      "n1qk2r/pbp1nppp/1p2p3/3pP3/1bBP4/2N2N2/PPP2PPP/R1BQK2R w KQkq d6 0 7",
      from,
      to
    );
  });

  it("should parse super-specific scrnario", () => {
    const [from, to] = parseMove(
      "r1bq1rk1/1pp1npbp/p1np2p1/8/2BNP3/2P1B3/PP1N1PPP/R2Q1RK1 w - - 0 10",
      "Nd2f3"
    );

    expect(from).toBe("D2");
    expect(to).toBe("F3");
  });
});
