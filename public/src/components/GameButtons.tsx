import { Button, Space } from "antd";
import React from "react";
import styled from "styled-components";
import { RetweetOutlined, SyncOutlined, StopOutlined } from "@ant-design/icons";
import { useComputerGame } from "../providers/ComputerGameProvider";
import {
  changeSidesAction,
  restartAction,
} from "../../actions/computerGameActions";

const ButtonsWrapper = styled.section`
  grid-area: buttons;
  padding: 15px 0;
  text-align: center;
`;

const GameButtons = () => {
  const [state, dispatch] = useComputerGame();

  return (
    <ButtonsWrapper>
      <Space>
        <Button
          onClick={() => dispatch(changeSidesAction())}
          icon={<RetweetOutlined />}
        >
          Change sides
        </Button>
        <Button icon={<StopOutlined />}>Abort</Button>
        <Button
          onClick={() => dispatch(restartAction())}
          icon={<SyncOutlined />}
        >
          Restart
        </Button>
      </Space>
    </ButtonsWrapper>
  );
};

export default GameButtons;
