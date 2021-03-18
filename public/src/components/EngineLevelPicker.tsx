import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useComputerGame } from '../providers/ComputerGameProvider'
import { setEngineDepth } from '../../actions/computerGameActions'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { Box, MenuItem, Stack } from '@chakra-ui/react'
import ButtonWrapper from '../design/Button'

const PickerWrapper = styled.section`
  font-size: 1rem;
  padding: 15px 0;
  grid-area: level;
`

const EngineLevelPicker = () => {
  const [state, dispatch] = useComputerGame()

  return (
    <Stack gridArea="level" direction="column" pos="relative">
      <strong>AI Level</strong>
      <Box pos="relative" w="100%">
        <Menu placement="bottom">
          <MenuButton as={ButtonWrapper} w="100%">
            AI Level {state.depth} <DownOutlined />
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
            <MenuItem onClick={() => dispatch(setEngineDepth(4))}>
              AI Level 4
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Stack>
  )
}

export default EngineLevelPicker
