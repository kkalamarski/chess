import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Tile from "./Tile";
// @ts-ignore
import texture from "url:../../assets/texture.jpg";
import Pieces from "../../../common/pieces";
import { usePossibleMoves, useTurn } from "../providers/ComputerGameProvider";
import { Modal } from "antd";
import Sidebar from "./Sidebar";
import useViewport from "../hooks/useViewport";

const jsChess = require("js-chess-engine");

interface ChessBoardProps {
  FEN: string;
  playerColor: Pieces;
  onMove: (from: string, to: string) => void;
}

const ChessBoardWrapper = styled.div`
  width: 1000px;
  max-width: 1000px;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;

const StyledChessBoard = styled.div<{ width: number }>`
  width: ${(p) => p.width - 30}px;
  max-width: 640px;
  height: ${(p) => p.width - 30}px;
  max-height: 640px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  background: url(${texture});
`;

const ChessBoard: React.FC<ChessBoardProps> = ({
  FEN,
  playerColor,
  onMove,
}) => {
  const [endModal, setEndModal] = useState(true);
  const [game, setGame] = useState<any>();
  const [selected, setSelected] = useState<string | null>(null);
  const possibleMoves = usePossibleMoves(selected || "");
  const turn = useTurn();
  const chessBoardRef = useRef<HTMLDivElement>(null);
  const { width } = useViewport();

  useEffect(() => {
    const game = jsChess.status(FEN);

    setGame(game);
  }, [FEN]);

  if (!game) return <div>Loading</div>;

  const pieces = game.pieces;

  const onTileClick = (tile: string, piece: string) => () => {
    if (turn !== playerColor) return;

    if (!selected && !!piece) {
      const pieceColor =
        piece.toLowerCase() === piece ? Pieces.BLACK : Pieces.WHITE;

      if (pieceColor === playerColor) setSelected(tile);
      return;
    }

    if (tile === selected) {
      setSelected(null);
      return;
    }

    if (selected) {
      if (possibleMoves.includes(tile.toUpperCase())) {
        onMove(selected, tile.toUpperCase());
      }
      setSelected(null);
      return;
    }
  };

  let tiles = Array(64)
    .fill("")
    .map((_, i) => {
      const color = (i + Math.floor(i / 8)) % 2 === 0 ? "#FFFBFF" : "#92817A";
      const file = "abcdefgh"[i % 8];
      const row = -Math.floor(i / 8) + 8;
      const tile = file + row;
      const piece: string = pieces?.[tile.toUpperCase()] ?? "";
      const pieceColor =
        piece.toLowerCase() === piece ? Pieces.BLACK : Pieces.WHITE;

      const check =
        piece.toLowerCase() === "k" && game.check && pieceColor === game.turn;

      return (
        <Tile
          color={color}
          tile={tile}
          key={tile}
          selected={tile === selected}
          check={check}
          piece={piece}
          onTileClick={onTileClick(tile, piece)}
          possibleMove={possibleMoves.includes(tile.toUpperCase())}
        />
      );
    });

  // Flip the board for black pieces
  if (playerColor === Pieces.BLACK) {
    tiles = tiles.reverse();
  }

  return (
    <ChessBoardWrapper ref={chessBoardRef}>

      <StyledChessBoard width={width}>{tiles}</StyledChessBoard>

      <Sidebar />
      {chessBoardRef.current && (
        <Modal
          visible={game.isFinished && endModal}
          footer={false}
          centered={true}
          title={false}
          getContainer={chessBoardRef.current}
          width={200}
          onCancel={() => setEndModal(false)}
        >
          {game.checkMate ? "Checkmate!" : "Stalemate!"}
        </Modal>
      )}
    </ChessBoardWrapper>
  );
};

export default ChessBoard;
