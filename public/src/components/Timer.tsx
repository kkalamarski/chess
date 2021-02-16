import React from "react";
import styled from "styled-components";

const TimerStyle = styled.div<{ active: boolean; low: boolean }>`
  color: ${(p) => (!p.active ? "#dddddd" : p.low ? "red" : "green")};
`;

const Timer: React.FC<{ active: boolean; low: boolean; time: number }> = ({
  active,
  low,
  time,
}) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <TimerStyle active={active} low={low}>
      {(minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)}
    </TimerStyle>
  );
};

export default Timer;
