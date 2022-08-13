import { CloseIcon } from '@chakra-ui/icons'
import { Box, Fade, IconButton } from '@chakra-ui/react'
import React from 'react'

interface RelativeModalProps {
  width?: number | string
  isOpen: boolean
  children: React.ReactElement
  onClose: Function
}

const RelativeModal: React.FC<RelativeModalProps> = ({
  width = 300,
  isOpen,
  children,
  onClose
}) => {
  return (
    <Fade in={isOpen}>
      <Box
        pos="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        display={isOpen ? 'grid' : 'none'}
        alignContent="center"
        justifyItems="center"
        background="rgba(0,0,0,.5)"
      >
        <Box boxShadow="xl" background="white" width={width} pos="relative">
          <IconButton
            pos="absolute"
            top={1}
            right={1}
            aria-label="close"
            variant="ghost"
            size="xs"
            icon={<CloseIcon />}
            onClick={() => onClose()}
          />
          {children}
        </Box>
      </Box>
    </Fade>
  )
}

export default RelativeModal
