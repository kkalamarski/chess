import { Stack, Box, Heading, Button, Text } from '@chakra-ui/react'
import React from 'react'
import {
  closeResultsWindow,
  restartAction
} from '../../actions/computerGameActions'
import RelativeModal from '../design/RelativeModal'
import { useComputerGame } from '../providers/ComputerGameProvider'

export enum GameResult {
  Victory = 'Victory',
  Draw = 'Draw',
  Defeat = 'Defeat',
  Progress = 'Progress'
}
export enum GameResultReason {
  Repetition = 'repetition',
  Agreement = 'agreement',
  TimeOut = 'time out',
  Checkmate = 'checkmate',
  Resignation = 'resignation',
  Stalemate = 'stalemate',
  Progress = 'Progress'
}

const colorMap = {
  [GameResult.Victory]: 'green.500',
  [GameResult.Draw]: 'gray.500',
  [GameResult.Defeat]: 'red.500',
  [GameResult.Progress]: 'white'
}

interface GameResultsModalProps {}

const GameResultModal: React.FC<GameResultsModalProps> = ({}) => {
  const [state, dispatch] = useComputerGame()

  return (
    <RelativeModal
      isOpen={state.isResultOpen}
      width={200}
      onClose={() => dispatch(closeResultsWindow())}
    >
      <Stack>
        <Box
          bg={colorMap[state.result]}
          py={8}
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Heading as="h3" fontSize="xl" color="white">
            {state.result}
          </Heading>
          <Text>by {state.reason}</Text>
        </Box>
        <Stack p="4" margin="0 !important">
          <Button
            variant="solid"
            size="sm"
            isFullWidth
            colorScheme="blackAlpha"
            onClick={() => dispatch(restartAction())}
          >
            Rematch
          </Button>
          <Button
            variant="solid"
            size="sm"
            isFullWidth
            colorScheme="blackAlpha"
            onClick={() => dispatch(closeResultsWindow())}
          >
            Close
          </Button>
        </Stack>
      </Stack>
    </RelativeModal>
  )
}

export default GameResultModal
