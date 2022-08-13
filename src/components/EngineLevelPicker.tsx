import React from 'react'
import { useComputerGame } from '../providers/ComputerGameProvider'
import { setEngineDepth } from '../actions/computerGameActions'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { Box, MenuItem, Stack } from '@chakra-ui/react'
import ButtonWrapper from '../design/Button'
import { ChevronDownIcon } from '@chakra-ui/icons'

const EngineLevelPicker = () => {
  const [state, dispatch] = useComputerGame()

  return (
    <Stack gridArea="level" direction="column" pos="relative">
      <strong>AI Level</strong>
      <Box pos="relative" w="100%">
        <Menu placement="bottom">
          <MenuButton as={ButtonWrapper} w="100%">
            AI Level {state.depth} <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => dispatch(setEngineDepth(1))}>
              AI Level 1
            </MenuItem>
            <MenuItem onClick={() => dispatch(setEngineDepth(2))}>
              AI Level 2
            </MenuItem>
            <MenuItem onClick={() => dispatch(setEngineDepth(3))}>
              AI Level 3
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Stack>
  )
}

export default EngineLevelPicker
