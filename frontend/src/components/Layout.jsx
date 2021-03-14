import React from "react";
import { Grid } from "./Grid";
import { Restart } from "./RestartComponent";

export const Layout = (props) => {
  const { socket } = props;
  let [cell, setCell] = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  return (
    <React.Fragment>
      <Grid cell={cell} socket={socket} handleClick={() => setCell} />
      <Restart socket={socket} />
    </React.Fragment>
  );
};
