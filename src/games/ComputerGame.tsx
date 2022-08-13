import React, { useCallback, useEffect, useState } from 'react'
import Pieces from '../../common/pieces'

import parsePGN from '../../engine/parsePGN'
import findBestMove from '../../engine/webWorker'
import {
  registerMoveAction,
  gameOverAction,
  timeTickAction,
  updateFENAction,
  setInitialSettingsAction,
  incrementAction,
  restartAction
} from '../actions/computerGameActions'
import GameView from '../../src/components/GameView'
import GameWrapper from '../../src/components/GameWrapper'
import LoadingScreen from '../../src/components/LoadingScreen'
import {
  useComputerGame,
  useTurn
} from '../../src/providers/ComputerGameProvider'

// import moveAudio from '../../public/assets/sounds/move.wav'
// import checkAudio from '../../public/assets/sounds/check.wav'
import {
  GameResult,
  GameResultReason
} from '../../src/components/GameResultModal'

const jsChess = require('js-chess-engine')

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

const playMoveFromOpeningBook = (
  openings: string[],
  PGN: string,
  FEN: string,
  moves: [string, string][]
): [string, string] => {
  if (moves.length > 20) throw 'not an opening'

  const availableOpenings = openings.filter((opening) => opening.includes(PGN))

  if (availableOpenings.length) {
    const randomOpening =
      availableOpenings[getRandomArbitrary(0, availableOpenings.length - 1)]
    const bookMoves: [string, string][] = parsePGN(FEN, randomOpening) as any
    const moveToPlay = bookMoves[moves.length]

    return moveToPlay
  }

  throw 'no book move'
}

interface ComputerGameProps {
  ai: string
  timeControl: string
  side: string
}

const ComputerGame: React.FC<ComputerGameProps> = ({
  ai,
  timeControl,
  side
}) => {
  const [openings, setOpenings] = useState<string[]>([])
  const [state, dispatch] = useComputerGame()
  const turn = useTurn()

  useEffect(() => {
    dispatch(setInitialSettingsAction({ ai, timeControl, side }))
  }, [])

  const onPlayerMove = useCallback(
    (from: string, to: string) => {
      const FEN = jsChess.move(state.FEN, from, to)

      const status = jsChess.status(FEN)

      // if (status.check) {
      //   const moveSound = new Audio(checkAudio)
      //   moveSound.volume = 0.1
      //   moveSound.play()
      // } else {
      //   const moveSound = new Audio(moveAudio)
      //   moveSound.volume = 0.1
      //   moveSound.play()
      // }

      dispatch(
        incrementAction(
          status.turn === Pieces.WHITE ? Pieces.BLACK : Pieces.WHITE
        )
      )
      dispatch(updateFENAction(FEN))
      dispatch(registerMoveAction([from, to]))
    },
    [state.FEN]
  )

  useEffect(() => {
    ; (async () => {
      const book1: any = await import('../../engine/opening_book1.json')
      setOpenings(book1.default.default ?? book1.default)

      try {
        const book2: any = await import('../../engine/opening_book2.json')
        setOpenings((openings) =>
          openings.concat(book2.default.default ?? book2.default)
        )

        const book3: any = await import('../../engine/opening_book3.json')
        setOpenings((openings) =>
          openings.concat(book3.default.default ?? book3.default)
        )

        const book4: any = await import('../../engine/opening_book4.json')
        setOpenings((openings) =>
          openings.concat(book4.default.default ?? book4.default)
        )

        const book5: any = await import('../../engine/opening_book5.json')
        setOpenings((openings) =>
          openings.concat(book5.default.default ?? book5.default)
        )
      } catch (e) {
        console.log('error loading opening books')
      }
    })()
  }, [])

  useEffect(() => {
    if (!openings?.length) return
    if (state.isOver) return

    if (turn !== state.playerColor) {
      const run = async () => {
        try {
          const [from, to] = playMoveFromOpeningBook(
            openings,
            state.PGN,
            state.startingFEN,
            state.moves
          )
          onPlayerMove(from, to)
        } catch (e) {
          const [from, to] = await findBestMove(state.FEN, state.depth)

          onPlayerMove(from, to)
        }
      }

      run()
    }
  }, [state.FEN, turn, state.playerColor, openings?.length])

  useEffect(() => {
    const game = jsChess.status(state.FEN)

    if (game.fullMove <= 1 || state.isOver) return

    if (!game.isFinished && state.whiteTime > 0 && state.blackTime > 0) {
      const blackTime =
        game.turn === Pieces.BLACK ? state.blackTime - 1 : state.blackTime
      const whiteTime =
        game.turn === Pieces.WHITE ? state.whiteTime - 1 : state.whiteTime

      const timeoutId = setTimeout(
        () => dispatch(timeTickAction({ blackTime, whiteTime })),
        1000
      )

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [
    state.FEN,
    turn,
    state.whiteTime,
    state.blackTime,
    state.playerColor,
    state.isOver
  ])

  useEffect(() => {
    const game = jsChess.status(state.FEN)

    if (game.isFinished) {
      if (game.checkMate) {
        const result =
          turn === state.playerColor ? GameResult.Defeat : GameResult.Victory
        dispatch(gameOverAction(result, GameResultReason.Checkmate))
      } else {
        dispatch(gameOverAction(GameResult.Draw, GameResultReason.Stalemate))
      }
    }

    if (state.blackTime <= 0) {
      dispatch(
        gameOverAction(
          state.playerColor === Pieces.BLACK
            ? GameResult.Defeat
            : GameResult.Victory,
          GameResultReason.TimeOut
        )
      )
    }

    if (state.whiteTime <= 0) {
      dispatch(
        gameOverAction(
          state.playerColor === Pieces.WHITE
            ? GameResult.Defeat
            : GameResult.Victory,
          GameResultReason.TimeOut
        )
      )
    }

    const isRepetition =
      Array.from(
        new Set(
          state.moves
            .slice(state.moves.length - 7, state.moves.length)
            .map((x) => x.join(','))
        )
      ).length === 4

    if (isRepetition) {
      dispatch(gameOverAction(GameResult.Draw, GameResultReason.Repetition))
    }
  }, [
    state.FEN,
    state.whiteTime,
    state.blackTime,
    state.playerColor,
    turn,
    state.moves
  ])

  if (!openings) return <LoadingScreen />

  return (
    <GameWrapper>
      <GameView
        PGN={state.PGN}
        FEN={state.FEN}
        playerColor={state.playerColor}
        onMove={onPlayerMove}
        moves={state.moves}
        isOver={state.isOver}
        result={state.result}
        reason={state.reason}
      />
    </GameWrapper>
  )
}

export default React.memo(ComputerGame)
