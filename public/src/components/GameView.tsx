import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Pieces from '../../../common/pieces'
import { Modal } from 'antd'
import MovesBox from './MovesBox'
import Timer from './Timer'
import EngineLevelPicker from './EngineLevelPicker'
import GameButtons from './GameButtons'
import LoadingScreen from './LoadingScreen'
import ChessBoard from './ChessBoard'

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

const GameView: React.FC<ChessBoardProps> = ({
  FEN,
  PGN,
  playerColor,
  onMove,
  moves
}) => {
  const [endModal, setEndModal] = useState(true)
  const [game, setGame] = useState<any>()

  const chessBoardRef = useRef<HTMLDivElement>(null)
  const lastMove = moves[moves.length - 1]

  useEffect(() => {
    const game = jsChess.status(FEN)

    setGame(game)
  }, [FEN])

  if (!game) return <LoadingScreen />

  return (
    <ChessBoardWrapper ref={chessBoardRef}>
      <ChessBoard
        FEN={FEN}
        lastMove={lastMove}
        pieces={game.pieces}
        playerColor={playerColor}
        onMove={onMove}
        check={game.check}
        turn={game.turn}
      />
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

export default React.memo(GameView)
