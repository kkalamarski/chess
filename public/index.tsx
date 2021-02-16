import React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";

import Game from "./src/components/Game";
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
  <SocketProvider>
    <GlobalStyles />
    <Game />
  </SocketProvider>
);

render(<Chess />, document.querySelector("#Root"));
