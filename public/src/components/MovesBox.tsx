import { Button, Modal } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import useViewport from "../hooks/useViewport";

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { width } = useViewport();

  if (width < 1000)
    return (
      <PgnViewerBox>
        <Button onClick={() => setModalOpen(true)}>Moves</Button>
        <Modal
          visible={modalOpen}
          footer={false}
          title={false}
          onCancel={() => setModalOpen(false)}
        >
          <PgnViewer>{PGN}</PgnViewer>
        </Modal>
      </PgnViewerBox>
    );

  return (
    <PgnViewerBox>
      <strong>Moves:</strong>
      <PgnViewer>{PGN}</PgnViewer>
    </PgnViewerBox>
  );
};

export default MovesBox;
