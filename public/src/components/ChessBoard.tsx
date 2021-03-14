import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Tile from './Tile'
// @ts-ignore
import texture from 'url:../../assets/texture.jpg'
import Pieces from '../../../common/pieces'
import { usePossibleMoves, useTurn } from '../providers/ComputerGameProvider'
import { Modal } from 'antd'
import useViewport from '../hooks/useViewport'
import MovesBox from './MovesBox'
import Timer from './Timer'
import EngineLevelPicker from './EngineLevelPicker'
import GameButtons from './GameButtons'
import LoadingScreen from './LoadingScreen'

const jsChess = require('js-chess-engine')

interface ChessBoardProps {
  FEN: string
  PGN: string
  playerColor: Pieces
  moves: [string, string][]
  onMove: (from: string, to: string) => void
}

const ChessBoardWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100vh;

  position: relative;
  display: grid;
  color: white;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 4fr 1fr 1fr;
  grid-template-areas:
    'level'
    'timer'
    'board'
    'moves'
    'buttons';

  @media (min-width: 1000px) {
    max-height: 640px;

    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      'board board board level'
      'board board board timer'
      'board board board moves'
      'board board board buttons';
  }
`

const StyledChessBoard = styled.div<{ width: number }>`
  width: ${(p) => p.width - 30}px;
  max-width: 640px;
  height: ${(p) => p.width - 30}px;
  max-height: 640px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  background: url(${texture});
  grid-area: board;
  border-radius: 0.3em;
  overflow: hidden;
`

const ChessBoard: React.FC<ChessBoardProps> = ({
  FEN,
  PGN,
  playerColor,
  onMove,
  moves
}) => {
  const [endModal, setEndModal] = useState(true)
  const [game, setGame] = useState<any>()
  const [selected, setSelected] = useState<string | null>(null)
  const possibleMoves = usePossibleMoves(selected || '')
  const turn = useTurn()
  const chessBoardRef = useRef<HTMLDivElement>(null)
  const { width } = useViewport()
  const lastMove = moves[moves.length - 1]

  useEffect(() => {
    const game = jsChess.status(FEN)

    setGame(game)
  }, [FEN])

  if (!game) return <LoadingScreen />

  const pieces = game.pieces

  const onTileClick = (tile: string, piece: string) => () => {
    if (!selected && !!piece) {
      const pieceColor =
        piece.toLowerCase() === piece ? Pieces.BLACK : Pieces.WHITE

      if (pieceColor === playerColor) setSelected(tile)
      return
    }

    if (tile === selected) {
      setSelected(null)
      return
    }

    if (selected) {
      if (possibleMoves.includes(tile.toUpperCase())) {
        onMove(selected, tile.toUpperCase())
      }
      setSelected(null)
      return
    }
  }

  let tiles = Array(64)
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

      const check =
        piece.toLowerCase() === 'k' && game.check && pieceColor === game.turn

      return (
        <Tile
          color={squareColor}
          tile={tile}
          key={tile}
          selected={tile === selected}
          check={check}
          piece={piece}
          onTileClick={onTileClick(tile, piece)}
          possibleMove={possibleMoves.includes(tile.toUpperCase())}
          lastMove={lastMove && lastMove.includes(tile.toUpperCase())}
        />
      )
    })

  // Flip the board for black pieces
  if (playerColor === Pieces.BLACK) {
    tiles = tiles.reverse()
  }

  return (
    <ChessBoardWrapper ref={chessBoardRef}>
      <StyledChessBoard width={width}>{tiles}</StyledChessBoard>
      <MovesBox PGN={PGN} />
      <Timer />
      <EngineLevelPicker />
      <GameButtons />
      {chessBoardRef.current && (
        <Modal
          visible={game.isFinished && endModal}
          footer={false}
          centered={true}
          title={false}
          getContainer={chessBoardRef.current}
          width={200}
          onCancel={() => setEndModal(false)}
        >
          {game.checkMate ? 'Checkmate!' : 'Stalemate!'}
        </Modal>
      )}
    </ChessBoardWrapper>
  )
}

export default ChessBoard
