import styled from "styled-components";

const GameWrapper = styled.section`
  position: relative;
  background: #1c1c1c;
  width: 100vw;
  height: 100vh;
  padding: 15px;

  @media (min-width: 1000px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

export default GameWrapper;
