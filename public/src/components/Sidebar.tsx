import React from "react";
import styled from "styled-components";
import { useGame } from "../providers/SocketProvider";

const SidebarWrapper = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;

  font-size: 3rem;
  color: white;
`;

const Sidebar = () => {
  const game = useGame();

  return <SidebarWrapper>{game?.board?.turn}'s turn</SidebarWrapper>;
};

export default Sidebar;
