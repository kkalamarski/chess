import React from 'react'
import styled, { css } from 'styled-components'
import Piece from './Piece'

interface TileProps {
  color: string
  piece: string
  tile: string
  selected: boolean
  check: boolean
  lastMove: boolean
  possibleMove: boolean
  onTileClick: React.MouseEventHandler<HTMLDivElement>
  onPieceSelect: React.MouseEventHandler<HTMLDivElement>
  onPieceDeselect: React.MouseEventHandler<HTMLDivElement>
}

const TileName = styled.div<{ show: boolean }>`
  color: #000000;
  position: absolute;
  width: 100%;
  text-align: center;
  opacity: 0.4;
  font-weight: bold;

  font-size: 0.7em;

  ${(p) =>
    p.show &&
    css`
      display: block !important;
    `}
`
const LastMoveOverlay = styled.div`
  background-color: var(--last-move);
  opacity: 0.7;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

const PossibleMoveOverlay = styled.div<{ isPiece: boolean }>`
  background-color: var(--available-move);
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  clip-path: circle(15%);
  z-index: 40;
  // transition: clip-path 50ms ease-in-out, opacity 50ms ease-in-out;
  /*
  ${(p) =>
    p.isPiece &&
    css`
      clip-path: polygon(
        0% 0%,
        0% 25%,
        25% 0%,
        75% 0%,
        100% 25%,
        100% 0%,
        0% 0%,
        0% 75%,
        25% 100%,
        0% 100%,
        100% 100%,
        100% 75%,
        75% 100%,
        100% 100%,
        0% 100%,
        0% 0%
      );
    `}
  */
`

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

    ${PossibleMoveOverlay} {
      clip-path: circle(100%);
      opacity: 0.3;
    }
  }
`

const Tile: React.FC<TileProps> = ({
  color,
  tile,
  piece,
  selected,
  check,
  possibleMove,
  lastMove,
  onTileClick,
  onPieceSelect,
  onPieceDeselect
}) => {
  const [file, row] = tile.split('')

  return (
    <TileWrapper
      color={selected ? 'var(--available-move)' : check ? 'red' : color}
      onClick={onTileClick}
      role="button"
      onDrop={(e) => {
        e.preventDefault()
        onTileClick(e)
      }}
      onDragOver={(e) => {
        e.preventDefault()
      }}
    >
      {possibleMove && <PossibleMoveOverlay isPiece={!!piece} />}
      {lastMove && <LastMoveOverlay />}
      <Piece
        piece={piece}
        draggable={true}
        onDragStart={onPieceSelect}
        onDragEnd={onPieceDeselect}
      />
      <TileName show={file === 'a' || row === '1'}>{tile}</TileName>
    </TileWrapper>
  )
}

export default React.memo(Tile)
