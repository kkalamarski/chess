const mapArrayToChessboard = (squareTable: number[]): { [x: string]: number } =>
  squareTable
    .map((value: number, i: number) => {
      const file = "ABCDEFGH"[i % 8];
      const rank = -Math.floor(i / 8) + 8;
      const tile = file + rank;

      return [tile, value];
    })
    .reduce(
      (chessBoard, [tile, value]) => ({
        ...chessBoard,
        [tile]: value,
      }),
      {}
    );

export default mapArrayToChessboard;
