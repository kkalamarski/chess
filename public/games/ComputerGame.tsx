import React, { useCallback, useEffect, useState } from 'react'
import Pieces from '../../common/pieces'

import parsePGN from '../../engine/parsePGN'
import findBestMove from '../../engine/webWorker'
import {
  registerMoveAction,
  timeTickAction,
  updateFENAction
} from '../actions/computerGameActions'
import GameView from '../src/components/GameView'
import GameWrapper from '../src/components/GameWrapper'
import LoadingScreen from '../src/components/LoadingScreen'
import {
  useComputerGame,
  usePlayerMove,
  useTurn
} from '../src/providers/ComputerGameProvider'

// @ts-ignore
import moveAudio from 'url:../assets/sounds/move.wav'
// @ts-ignore
import checkAudio from 'url:../assets/sounds/check.wav'

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

const ComputerGame = () => {
  const [openings, setOpenings] = useState<string[]>([])
  const [state, dispatch] = useComputerGame()
  const turn = useTurn()

  const onPlayerMove = useCallback(
    (from: string, to: string) => {
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
    },
    [state.FEN]
  )

  useEffect(() => {
    ;(async () => {
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

    if (turn !== state.playerColor) {
      ;(async () => {
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
      })()
    }
  }, [state.FEN, turn, state.playerColor, openings?.length])

  useEffect(() => {
    const game = jsChess.status(state.FEN)

    if (game.fullMove <= 1) return

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
  }, [state.FEN, turn, state.whiteTime, state.blackTime, state.playerColor])

  if (!openings) return <LoadingScreen />

  return (
    <GameWrapper>
      <GameView
        PGN={state.PGN}
        FEN={state.FEN}
        playerColor={state.playerColor}
        onMove={onPlayerMove}
        moves={state.moves}
      />
    </GameWrapper>
  )
}

export default React.memo(ComputerGame)
