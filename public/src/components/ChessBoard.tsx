import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tile from "./Tile";
// @ts-ignore
import texture from "url:../../assets/texture.jpg";
import useEmitMove from "../hooks/useEmitMove";
import useGameSettings from "../hooks/useGameSettings";
import Pieces from "../../../common/pieces";
import {
  usePlayerMove,
  usePossibleMoves,
  useTurn,
} from "../providers/ComputerGameProvider";

const jsChess = require("js-chess-engine");

interface ChessBoardProps {
  FEN: string;
  playerColor: Pieces;
  onMove: (from: string, to: string) => void;
}

const ChessBoardWrapper = styled.section`
  width: 640px;
  height: 640px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  background: url(${texture});
`;

const ChessBoard: React.FC<ChessBoardProps> = ({
  FEN,
  playerColor,
  onMove,
}) => {
  const [game, setGame] = useState<any>();
  const [selected, setSelected] = useState<string | null>(null);
  const possibleMoves = usePossibleMoves(selected || "");
  const turn = useTurn();

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
      onMove(selected, tile);
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
      const piece = pieces?.[tile.toUpperCase()];

      return (
        <Tile
          color={color}
          tile={tile}
          key={tile}
          selected={tile === selected}
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

  return <ChessBoardWrapper>{tiles}</ChessBoardWrapper>;
};

export default ChessBoard;
