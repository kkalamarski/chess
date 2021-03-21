import { Box } from '@chakra-ui/layout'
import React, { useCallback, useMemo, useState } from 'react'
import Pieces from '../../../common/pieces'
import useViewport from '../hooks/useViewport'
import GameResultModal, {
  GameResult,
  GameResultReason
} from './GameResultModal'
import Tile from './Tile'

const jsChess = require('js-chess-engine')

interface ChessBoardProps {
  FEN: string
  pieces: any
  playerColor: Pieces
  turn: Pieces
  check: boolean
  isFinished: boolean
  lastMove: [string, string]
  onMove: (from: string, to: string) => void
  result: GameResult
  reason: GameResultReason
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  FEN,
  pieces,
  playerColor,
  lastMove,
  check,
  turn,
  onMove
}) => {
  const { width } = useViewport()
  const [selected, setSelected] = useState<string>('')

  const possibleMoves = useMemo(() => {
    return jsChess.moves(FEN)[selected.toUpperCase()] || []
  }, [selected, FEN])

  const onTileClick = useCallback(
    (tile: string, piece: string) => () => {
      if (!selected && !!piece) {
        const pieceColor =
          piece.toLowerCase() === piece ? Pieces.BLACK : Pieces.WHITE

        if (pieceColor === playerColor) setSelected(tile)
        return
      }

      if (tile === selected) {
        setSelected('')
        return
      }

      if (selected) {
        if (possibleMoves.includes(tile.toUpperCase())) {
          onMove(selected, tile.toUpperCase())
        }
        setSelected('')
        return
      }
    },
    [selected, possibleMoves, playerColor]
  )

  let tiles = useMemo(
    () =>
      Array(64)
        .fill('')
        .map((_, i) => {
          const squareColor =
            (i + Math.floor(i / 8)) % 2 === 0
              ? 'var(--light-square)'
              : 'var(--dark-square)'

          const file = 'abcdefgh'[i % 8]
          const row = -Math.floor(i / 8) + 8
          const tile = file + row
          const piece: string = pieces?.[tile.toUpperCase()] ?? ''
          const pieceColor =
            piece.toLowerCase() === piece ? Pieces.BLACK : Pieces.WHITE

          const isInCheck =
            piece.toLowerCase() === 'k' && check && pieceColor === turn

          return (
            <Tile
              color={squareColor}
              tile={tile}
              key={tile}
              selected={tile === selected}
              check={isInCheck}
              piece={piece}
              onTileClick={onTileClick(tile, piece)}
              onPieceSelect={() => setSelected(tile)}
              onPieceDeselect={() => setSelected('')}
              possibleMove={possibleMoves.includes(tile.toUpperCase())}
              lastMove={lastMove && lastMove.includes(tile.toUpperCase())}
            />
          )
        }),
    [pieces, selected, check, turn, onTileClick, possibleMoves, lastMove, width]
  )

  // Flip the board for black pieces
  if (playerColor === Pieces.BLACK) {
    tiles = tiles.reverse()
  }

  return (
    <Box
      pos="relative"
      w={width - 30}
      h={width - 30}
      maxH="640"
      maxW="640"
      gridArea="board"
      rounded="lg"
      overflow="hidden"
    >
      <Box
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        w="100%"
        h="100%"
      >
        {tiles}
      </Box>
      <GameResultModal />
    </Box>
  )
}

export default React.memo(ChessBoard)
