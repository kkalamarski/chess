import React, { useEffect, useMemo, useRef } from 'react'
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
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react'

const PgnViewerBox = styled.section`
  font-size: 1rem;
  text-align: left;
  grid-area: moves;
`

const MovesBox: React.FC<{ PGN: string }> = ({ PGN }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { width } = useViewport()
  const ref = useRef<HTMLDivElement>(null)

  const moves = useMemo(() => PGN.split(' '), [PGN])

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [moves])

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
              <SimpleGrid columns={3}>
                {moves.map((x) => (
                  <div>{x}</div>
                ))}
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </PgnViewerBox>
    )

  return (
    <PgnViewerBox>
      <strong>Moves:</strong>
      <SimpleGrid columns={3} maxH={200} ref={ref} overflow="scroll">
        {moves.map((x) => (
          <div>{x}</div>
        ))}
      </SimpleGrid>
    </PgnViewerBox>
  )
}

export default MovesBox
