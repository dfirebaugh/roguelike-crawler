import React from "react";
import Cell from "./Cell";

const Grid = (props) => {
  const cellComponents = grid => {
    let cells = grid.map((currRow, i) => {
      let row = currRow.map((currCell, j) => {
        return (
          <Cell
            key={i + "," + j}
            type={props.level[i][j].type}
            show={props.level[i][j].show}
            hidden={props.level[i][j].hidden}
            row={i}
            col={j}
          />
        );
      });
      return (
        <div key={i} style={rowStyle}>
          {row}
        </div>
      );
    });

    return cells;
  };
  return (
    <div className="container gameBox text-center">
      <div>{cellComponents(props.level)}</div>
    </div>
  );
};

// component styles
const rowStyle = {
  display: "flex",
  float: "left",
  clear: "both"
};

export default Grid;
