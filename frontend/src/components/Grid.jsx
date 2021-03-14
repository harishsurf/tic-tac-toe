import React from "react";
import { Cell } from "./Cell";

export const Grid = (props) => {
  const { cell, socket, handleClick } = props;

  const renderCell = (i, j) => {
    return <Cell value={cell[i][j]} onClick={() => handleClick(i, j)} />;
  };

  return (
    <div className="container-fluid col-md-2 pt-4">
      <div className="row border border-primary">
        {renderCell(0, 0)}
        {renderCell(0, 1)}
        {renderCell(0, 2)}
      </div>
      <div className="row border border-primary">
        {renderCell(1, 0)}
        {renderCell(1, 1)}
        {renderCell(1, 2)}
      </div>
      <div className="row border border-primary">
        {renderCell(2, 0)}
        {renderCell(2, 1)}
        {renderCell(2, 2)}
      </div>
    </div>
  );
};
