import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useComputerGame } from "../providers/ComputerGameProvider";
import { setEngineDepth } from "../../actions/computerGameActions";

const PickerWrapper = styled.section`
  font-size: 1rem;
  padding: 15px 0;
  grid-area: level;
`;

const EngineLevelPicker = () => {
  const [state, dispatch] = useComputerGame();

  const menu = (
    <Menu>
      <Menu.Item onClick={() => dispatch(setEngineDepth(1))}>
        AI Level 1
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(setEngineDepth(2))}>
        AI Level 2
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(setEngineDepth(3))}>
        AI Level 3
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(setEngineDepth(4))}>
        AI Level 4
      </Menu.Item>
    </Menu>
  );

  return (
    <PickerWrapper>
      <strong>AI Level</strong>
      <Dropdown overlay={menu}>
        <Button block>
          AI Level {state.depth} <DownOutlined />
        </Button>
      </Dropdown>
    </PickerWrapper>
  );
};

export default EngineLevelPicker;
