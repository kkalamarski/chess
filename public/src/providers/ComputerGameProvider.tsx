import React, { useContext, useReducer } from 'react'
import {
  registerMoveAction,
  updateFENAction
} from '../../actions/computerGameActions'
import computerGameReducer, {
  ComputerGameState,
  defaultState
} from '../reducers/computerGameReducer'

// @ts-ignore
import moveAudio from 'url:../../../public/assets/sounds/move.wav'
// @ts-ignore
import checkAudio from 'url:../../../public/assets/sounds/check.wav'

const jsChess = require('js-chess-engine')

const ComputerGameContext = React.createContext<[ComputerGameState, Function]>([
  defaultState,
  () => null
])

export function useComputerGame<T = ComputerGameState>(
  fn = (x: ComputerGameState): any => x
): [T, Function] {
  const [state, dispatch] = useContext(ComputerGameContext)

  return [fn(state), dispatch]
}

export const usePossibleMoves = (selectedPiece: string = ''): string[] => {
  const [FEN] = useComputerGame<string>((state) => state.FEN)
  const possibleMoves = jsChess.moves(FEN)[selectedPiece.toUpperCase()]

  return possibleMoves ?? []
}

export const usePlayerMove = () => {
  const [state, dispatch] = useComputerGame()

  return (from: string, to: string) => {
    const FEN = jsChess.move(state.FEN, from, to)

    const status = jsChess.status(FEN)

    if (status.check) {
      const moveSound = new Audio(checkAudio)
      moveSound.volume = 0.1
      moveSound.play()
    } else {
      const moveSound = new Audio(moveAudio)
      moveSound.volume = 0.1
      moveSound.play()
    }

    dispatch(updateFENAction(FEN))
    dispatch(registerMoveAction([from, to]))
  }
}

export const useTurn = () => {
  const [state] = useComputerGame()

  return jsChess.status(state.FEN).turn
}

const ComputerGameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(computerGameReducer, defaultState)

  return (
    <ComputerGameContext.Provider value={[state, dispatch]}>
      {children}
    </ComputerGameContext.Provider>
  )
}

export default ComputerGameProvider
