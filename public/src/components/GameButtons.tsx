import Button from '../design/Button'
import React from 'react'
import styled from 'styled-components'
import { useComputerGame } from '../providers/ComputerGameProvider'
import {
  changeSidesAction,
  restartAction
} from '../../actions/computerGameActions'
import { Stack } from '@chakra-ui/layout'
import { NotAllowedIcon, RepeatClockIcon, RepeatIcon } from '@chakra-ui/icons'

const ButtonsWrapper = styled.section`
  grid-area: buttons;
  padding: 15px 0;
  text-align: center;
`

const GameButtons = () => {
  const [state, dispatch] = useComputerGame()

  return (
    <ButtonsWrapper>
      <Stack isInline>
        <Button
          onClick={() => dispatch(changeSidesAction())}
          leftIcon={<RepeatIcon />}
        >
          Change sides
        </Button>
        <Button leftIcon={<NotAllowedIcon />}>Abort</Button>
        <Button
          onClick={() => dispatch(restartAction())}
          leftIcon={<RepeatClockIcon />}
        >
          Restart
        </Button>
      </Stack>
    </ButtonsWrapper>
  )
}

export default GameButtons
