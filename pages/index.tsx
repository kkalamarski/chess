import React, { useState } from 'react'
import { Box, Grid, Stack } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Select
} from '@chakra-ui/react'

const LandingPage = () => {
  return (
    <Grid
      gap={2}
      h="100%"
      alignContent="center"
      justifyContent="center"
      textAlign="center"
      p={3}
      w="100%"
      maxW="800px"
      m="auto"
    >
      <Box p={5}>
        <form method="get" action="/chess">
          <Stack spacing="15px">
            <FormControl id="ai">
              <FormLabel>Level</FormLabel>
              <Select defaultValue="2" name="ai">
                <option value="1">AI Level 1</option>
                <option value="2">AI Level 2</option>
                <option value="3">AI Level 3</option>
                <option value="4">AI Level 4</option>
              </Select>
              <FormHelperText>
                Move time depends on device's processing power
              </FormHelperText>
            </FormControl>

            <FormControl id="time">
              <FormLabel>Time Control</FormLabel>
              <Select defaultValue="3x2" name="timeControl">
                <option value="1x0">Bullet 1x0</option>
                <option value="1x2">Bullet 1x2</option>
                <option value="3x0">Blitz 3x0</option>
                <option value="3x2">Blitz 3x2</option>
                <option value="5x3">Blitz 5x3</option>
                <option value="10x0">Rapid 10x0</option>
                <option value="10x5">Rapid 10x5</option>
                <option value="15x10">Rapid 15x10</option>
                <option value="30x0">Classical 30x0</option>
                <option value="30x15">Classical 30x15</option>
              </Select>
            </FormControl>

            <FormControl id="side">
              <FormLabel>Side</FormLabel>
              <Select defaultValue="random" name="side">
                <option value="random">Random</option>
                <option value="white">White</option>
                <option value="black">Black</option>
              </Select>
            </FormControl>

            <Button type="submit" size="lg" colorScheme="green">
              Play vs. Computer
            </Button>
          </Stack>
        </form>
      </Box>
    </Grid>
  )
}

export default LandingPage
