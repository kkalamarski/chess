import React from 'react'
import styled from 'styled-components'
import Pieces from '../../../common/pieces'
import { useComputerGame } from '../providers/ComputerGameProvider'

const jsChess = require('js-chess-engine')

const TimerStyle = styled.div<{ active: boolean; lowTime: boolean }>`
  color: ${(p) => (!p.active ? '#dddddd' : p.lowTime ? 'red' : 'green')};
  display: block;
  text-align: center;
`

const StyledTimer: React.FC<{
  active: boolean
  player?: boolean
  lowTime: boolean
  time: number
}> = ({ active, lowTime, time, player }) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <TimerStyle active={active} lowTime={lowTime}>
      <div className="label">{player ? 'Player' : 'Computer'}</div>
      {(minutes > 9 ? minutes : '0' + minutes) +
        ':' +
        (seconds > 9 ? seconds : '0' + seconds)}
    </TimerStyle>
  )
}

const TimerBox = styled.section`
  grid-area: timer;
  display: flex;
  font-size: 2rem;
  flex-direction: row-reverse;
  justify-content: space-between;

  hr {
    display: none;
  }

  .label {
    text-align: left;
    font-size: 0.7rem;
  }

  @media (min-width: 1000px) {
    font-size: 3rem;
    /* display: block; */

    /* hr {
      display: initial;
    } */

    /* .label {
      display: none;
    } */
  }
`

const Timer = () => {
  const [state] = useComputerGame()
  const game = jsChess.status(state.FEN)

  const computerTime =
    state.playerColor === Pieces.WHITE ? state.blackTime : state.whiteTime
  const playerTime =
    state.playerColor === Pieces.BLACK ? state.blackTime : state.whiteTime

  return (
    <TimerBox>
      <StyledTimer
        active={game.turn !== state.playerColor}
        lowTime={computerTime < 60}
        time={computerTime}
      />
      <hr style={{ width: '100%' }} />
      <StyledTimer
        player
        active={game.turn === state.playerColor}
        lowTime={playerTime < 60}
        time={playerTime}
      />
    </TimerBox>
  )
}

export default React.memo(Timer)
