import React from "react";
import styled, { css } from "styled-components";
import Piece from "./Piece";

interface TileProps {
  color: string;
  piece: string;
  tile: string;
  selected: boolean;
  check: boolean;
  possibleMove: boolean;
  onTileClick: React.MouseEventHandler<HTMLDivElement>;
}

const TileName = styled.div<{ show: boolean }>`
  color: #000000;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100%;

  font-size: 0.7em;

  ${(p) =>
    p.show &&
    css`
      display: block !important;
    `}
`;

const TileWrapper = styled.div<{ color: string }>`
  background: ${(p) => p.color};
  cursor: pointer;
  position: relative;

  ${TileName} {
    display: none;
  }

  &:hover {
    ${TileName} {
      display: block;
    }
  }
`;

const PossibleMoveOverlay = styled.div`
  background-color: #8db38b;
  opacity: 0.8;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const Tile: React.FC<TileProps> = ({
  color,
  tile,
  piece,
  selected,
  check,
  possibleMove,
  onTileClick,
}) => {
  const [file, row] = tile.split("");

  return (
    <TileWrapper
      color={selected ? "#04724D" : check ? "red" : color}
      onClick={onTileClick}
      role="button"
    >
      {possibleMove && <PossibleMoveOverlay />}
      <Piece piece={piece} />
      <TileName show={file === "a" || row === "1"}>{tile}</TileName>
    </TileWrapper>
  );
};

export default Tile;
