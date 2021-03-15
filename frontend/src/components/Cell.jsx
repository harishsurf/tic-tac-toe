import React from "react";
import "./style.css";

export const Cell = (props) => {
  return (
    <div
      className="col cell boldText"
      // id={props.index}
      onClick={() => props.onClick()}
    >
      {props.value}
    </div>
  );
};
