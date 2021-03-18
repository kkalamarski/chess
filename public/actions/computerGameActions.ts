import { GameResult, GameResultReason } from '../src/components/GameResultModal'

enum ComputerGameActionTypes {
  UPDATE_FEN = 'UPDATE_FEN',
  REGISTER_MOVE = 'REGISTER_MOVE',
  TIME = 'TIME',
  SET_ENGINE_DEPTH = 'SET_ENGINE_DEPTH',
  CHANGE_SIDES = 'CHANGE_SIDES',
  RESTART = 'RESTART',
  GAME_OVER = 'SHOW_GAME_RESULT',
  HIDE_GAME_RESULT = 'HIDE_GAME_RESULT'
}

export const updateFENAction = (FEN: string) => ({
  type: ComputerGameActionTypes.UPDATE_FEN,
  data: FEN
})

export const restartAction = () => ({
  type: ComputerGameActionTypes.RESTART
})

export const closeResultsWindow = () => ({
  type: ComputerGameActionTypes.HIDE_GAME_RESULT
})

export const changeSidesAction = () => ({
  type: ComputerGameActionTypes.CHANGE_SIDES
})

export const setEngineDepth = (depth: number) => ({
  type: ComputerGameActionTypes.SET_ENGINE_DEPTH,
  data: depth
})

export const registerMoveAction = (move: [string, string]) => ({
  type: ComputerGameActionTypes.REGISTER_MOVE,
  data: move
})

export const timeTickAction = (times: {
  whiteTime: number
  blackTime: number
}) => ({
  type: ComputerGameActionTypes.TIME,
  data: times
})

export const gameOverAction = (
  result: GameResult,
  reason: GameResultReason
) => ({
  type: ComputerGameActionTypes.GAME_OVER,
  data: { result, reason }
})

export default ComputerGameActionTypes
