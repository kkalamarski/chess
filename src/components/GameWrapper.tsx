import styled from 'styled-components'

const GameWrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 15px;

  @media (min-width: 1000px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

export default GameWrapper
