import React from 'react'
import styled from 'styled-components'
import useViewport from '../hooks/useViewport'
import Button from '../design/Button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'

const PgnViewerBox = styled.section`
  font-size: 1rem;
  text-align: left;
  grid-area: moves;
`

const PgnViewer = styled.article`
  font-size: 1rem;
  text-align: left;
  height: 200px;
  overflow: auto;
  border: 1px solid #333333;
  padding: 5px;
`

const MovesBox: React.FC<{ PGN: string }> = ({ PGN }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { width } = useViewport()

  if (width < 1000)
    return (
      <PgnViewerBox>
        <Button onClick={onOpen}>Moves</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="90%">
            <ModalHeader>Moves:</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PgnViewer>{PGN}</PgnViewer>
            </ModalBody>
          </ModalContent>
        </Modal>
      </PgnViewerBox>
    )

  return (
    <PgnViewerBox>
      <strong>Moves:</strong>
      <PgnViewer>{PGN}</PgnViewer>
    </PgnViewerBox>
  )
}

export default MovesBox
