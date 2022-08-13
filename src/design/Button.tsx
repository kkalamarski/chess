import { Button, ButtonProps } from '@chakra-ui/button'
import React from 'react'

const ButtonWrapper: React.FC<ButtonProps> = React.forwardRef<ButtonProps, any>(
  ({ children, ...props }, ref) => {
    return (
      <Button
        colorScheme="whiteAlpha"
        color="white"
        size="sm"
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

ButtonWrapper.displayName = 'ButtonWrapper'

export default ButtonWrapper
