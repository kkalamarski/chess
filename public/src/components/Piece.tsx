import React from "react";
import styled, { css } from "styled-components";
// @ts-ignore
import pieces from "url:../../assets/sprites/classic.png";
import Pieces from "../../../common/pieces";

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
`;

function hasLowerCase(str: string) {
  return /[a-z]/.test(str);
}

const calculateSpritePosition = (p: { piece: string; color: string }) => {
  let x = 0,
    y = 0;

  if (p.color === Pieces.WHITE) {
    y = -60;
  } else {
    y = 0;
  }

  if (p.piece === "Q") {
    x = 0;
  }

  if (p.piece === "K") {
    x = -60;
  }

  if (p.piece === "R") {
    x = -120;
  }

  if (p.piece === "N") {
    x = -180;
  }

  if (p.piece === "B") {
    x = -240;
  }

  if (p.piece === "P") {
    x = -300;
  }

  return css`
    object-position: ${x}px ${y}px;
  `;
};

const PieceIcon = styled.img.attrs({ src: pieces })<{
  piece: string;
  color: string;
}>`
  object-fit: none;
  object-position: 0 0;
  width: 60px;
  height: 60px;
  transform: scale(1.3);

  ${calculateSpritePosition};
`;

const Piece: React.FC<{ piece: string }> = ({ piece }) => {
  const color = hasLowerCase(piece) ? Pieces.BLACK : Pieces.WHITE;

  return (
    <PieceWrapper color={color}>
      {piece && <PieceIcon piece={piece.toUpperCase()} color={color} />}
    </PieceWrapper>
  );
};

export default Piece;
