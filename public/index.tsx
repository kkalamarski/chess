import React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";
import ComputerGame from "./games/ComputerGame";

import Game from "./src/components/Game";
import ComputerGameProvider from "./src/providers/ComputerGameProvider";
import SocketProvider from "./src/providers/SocketProvider";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  html, body {
    margin: 0;
    padding: 0;

    font-family: 'Montserrat', sans-serif;
  }
`;

const Chess = () => (
  <ComputerGameProvider>
    {/* <SocketProvider> */}
    <GlobalStyles />
    {/* <Game /> */}
    <ComputerGame />
    {/* </SocketProvider> */}
  </ComputerGameProvider>
);

render(<Chess />, document.querySelector("#Root"));
