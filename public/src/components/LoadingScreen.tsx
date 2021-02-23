import { Progress } from "antd";
import React from "react";

const LoadingScreen = () => {
  return (
    <Progress
      strokeColor={{
        from: "#108ee9",
        to: "#87d068",
      }}
      percent={99.9}
      status="active"
    />
  );
};

export default LoadingScreen;
