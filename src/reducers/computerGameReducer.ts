import Pieces from '../../common/pieces'
import { convertGameToPGN } from '../../engine/convertMoveToPGN'
import ComputerGameActionTypes from '../actions/computerGameActions'
import { GameResult, GameResultReason } from '../components/GameResultModal'

export interface ComputerGameState {
  turn: Pieces
  playerColor: Pieces
  FEN: string
  startingFEN: string
  PGN: string
  initialTime: number
  whiteTime: number
  blackTime: number
  increment: number
  depth: number
  moves: [string, string][]
  isOver: boolean
  isResultOpen: boolean
  result: GameResult
  reason: GameResultReason
}

export const defaultState: ComputerGameState = {
  depth: 2,
  initialTime: 3 * 60,
  whiteTime: 3 * 60,
  blackTime: 3 * 60,
  increment: 0,
  turn: Pieces.WHITE,
  playerColor: Math.random() > 0.5 ? Pieces.WHITE : Pieces.BLACK,
  PGN: '',
  FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // starting position
  startingFEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // starting position
  moves: [],
  isOver: false,
  isResultOpen: false,
  result: GameResult.Progress,
  reason: GameResultReason.Progress
}

interface Action {
  type: ComputerGameActionTypes
  data: any
}

const computerGameReducer = (state: ComputerGameState, action: Action) => {
  switch (action.type) {
    case ComputerGameActionTypes.SET_INITIAL_SETTINGS:
      const playerColor =
        action.data.side === 'random'
          ? Math.random() > 0.5
            ? Pieces.WHITE
            : Pieces.BLACK
          : action.data.side === 'white'
            ? Pieces.WHITE
            : Pieces.BLACK

      const [time, increment] = action.data.timeControl.split('x').map(Number)

      return {
        ...state,
        depth: Number(action.data.ai),
        playerColor,
        blackTime: time * 60,
        whiteTime: time * 60,
        initialTime: time * 60,
        increment
      }
    case ComputerGameActionTypes.SET_ENGINE_DEPTH:
      return { ...state, depth: action.data }

    case ComputerGameActionTypes.UPDATE_FEN:
      return { ...state, FEN: action.data }

    case ComputerGameActionTypes.RESTART:
      return {
        ...defaultState,
        initialTime: state.initialTime,
        blackTime: state.initialTime,
        whiteTime: state.initialTime,
        increment: state.increment,
        playerColor:
          state.playerColor === Pieces.WHITE ? Pieces.BLACK : Pieces.WHITE
      }

    case ComputerGameActionTypes.CHANGE_SIDES:
      return {
        ...state,
        playerColor:
          state.playerColor === Pieces.WHITE ? Pieces.BLACK : Pieces.WHITE
      }

    case ComputerGameActionTypes.REGISTER_MOVE:
      const moves = [...state.moves, action.data]
      const PGN = convertGameToPGN(state.startingFEN, moves)

      return { ...state, moves, PGN }

    case ComputerGameActionTypes.TIME:
      return {
        ...state,
        whiteTime: action.data.whiteTime,
        blackTime: action.data.blackTime
      }

    case ComputerGameActionTypes.INCREMENT:
      let whiteTime = state.whiteTime,
        blackTime = state.blackTime

      if (action.data.color === Pieces.WHITE) whiteTime += state.increment
      else blackTime += state.increment

      return { ...state, whiteTime, blackTime }

    case ComputerGameActionTypes.GAME_OVER:
      return {
        ...state,
        isOver: true,
        isResultOpen: true,
        reason: action.data.reason,
        result: action.data.result
      }

    case ComputerGameActionTypes.HIDE_GAME_RESULT:
      return {
        ...state,
        isResultOpen: false
      }

    default:
      return state
  }
}

export default computerGameReducer
