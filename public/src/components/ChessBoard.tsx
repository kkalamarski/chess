import React, { useState } from "react";
import styled from "styled-components";
import Tile from "./Tile";
// @ts-ignore
import texture from "url:../../assets/texture.jpg";
import usePieces from "../hooks/usePieces";
import useEmitMove from "../hooks/useEmitMove";
import useGameSettings from "../hooks/useGameSettings";
import game from "../../../server/game";
import Pieces from "../../../common/pieces";

const ChessBoardWrapper = styled.section`
  width: 640px;
  height: 640px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  background: url(${texture});
`;

const ChessBoard = () => {
  const pieces = usePieces();
  const emitMove = useEmitMove();
  const gameSettings = useGameSettings();
  const [selected, setSelected] = useState<string | null>(null);

  const onTileClick = (tile: string, piece: string) => () => {
    if (!selected && !!piece) {
      const pieceColor =
        piece.toLowerCase() === piece ? Pieces.BLACK : Pieces.WHITE;

      if (pieceColor === gameSettings?.pieces) setSelected(tile);
      return;
    }

    if (tile === selected) {
      setSelected(null);
      return;
    }

    if (selected) {
      emitMove(selected, tile);
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
        />
      );
    });

  // Flip the board for black pieces
  if (gameSettings?.pieces === Pieces.BLACK) {
    tiles = tiles.reverse();
  }

  return <ChessBoardWrapper>{tiles}</ChessBoardWrapper>;
};

export default ChessBoard;
