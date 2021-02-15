import React from "react";
import { render } from "react-dom";

import Game from "./src/components/Game";
import SocketProvider from "./src/providers/SocketProvider";

const Chess = () => (
  <SocketProvider>
    <Game />
  </SocketProvider>
);

render(<Chess />, document.querySelector("#Root"));
