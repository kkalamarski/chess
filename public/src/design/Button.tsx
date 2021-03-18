import { Button, ButtonProps } from '@chakra-ui/button'
import React from 'react'

const ButtonWrapper: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button colorScheme="whiteAlpha" color="white" size="sm" {...props}>
      {children}
    </Button>
  )
}

export default ButtonWrapper
