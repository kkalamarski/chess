import React from 'react'
import styled, { css } from 'styled-components'
import Pieces from '../../common/pieces'

const PieceWrapper = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 48px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${(p) => p.color};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
`

function hasLowerCase(str: string) {
  return /[a-z]/.test(str)
}

const calculateSpritePosition = (p: { piece: string; color: string }) => {
  let x = 0,
    y = 0

  if (p.color === Pieces.BLACK) {
    y = -60
  } else {
    y = 0
  }

  if (p.piece === 'K') {
    x = 0
  }

  if (p.piece === 'Q') {
    x = -60
  }

  if (p.piece === 'B') {
    x = -120
  }

  if (p.piece === 'N') {
    x = -180
  }

  if (p.piece === 'R') {
    x = -240
  }

  if (p.piece === 'P') {
    x = -300
  }

  x = x * 8
  y = y * 8

  return css`
    object-position: ${x}px ${y}px;
  `
}

const PieceIcon = styled.img.attrs({ src: 'assets/sprites/classic.png' }) <{
  piece: string
  color: string
}>`
  object-fit: none;
  object-position: 0 0;
  width: calc(60px * 8);
  height: calc(60px * 8);
  transform: scale(0.15);
  max-width: unset;

  @media (max-width: 1000px) {
    transform: scale(0.09);
  }

  ${calculateSpritePosition};
`

const Piece: React.FC<{
  piece: string
  draggable: boolean
  onDragStart: Function
  onDragEnd: Function
}> = ({ piece, draggable, onDragStart, onDragEnd }) => {
  const color = hasLowerCase(piece) ? Pieces.BLACK : Pieces.WHITE

  return (
    <PieceWrapper color={color}>
      {piece && (
        <PieceIcon
          piece={piece.toUpperCase()}
          color={color}
          draggable={draggable}
          onDragStart={() => onDragStart()}
          onDragEnd={() => onDragEnd()}
        />
      )}
    </PieceWrapper>
  )
}

export default React.memo(Piece)
