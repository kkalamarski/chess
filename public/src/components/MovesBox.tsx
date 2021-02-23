import React from "react";
import styled from "styled-components";

const PgnViewerBox = styled.section`
  font-size: 1rem;
  text-align: left;
  grid-area: moves;
`;

const PgnViewer = styled.article`
  font-size: 1rem;
  text-align: left;
  height: 200px;
  overflow: auto;
  border: 1px solid #333333;
  padding: 5px;
`;

const MovesBox: React.FC<{ PGN: string }> = ({ PGN }) => {
  return (
    <PgnViewerBox>
      <strong>Moves:</strong>
      <PgnViewer>{PGN}</PgnViewer>
    </PgnViewerBox>
  );
};

export default MovesBox;
