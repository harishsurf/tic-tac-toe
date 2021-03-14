import React from "react";

export const Cell = (props) => {
    return(
        <div className="col" id={props.index} onClick={() => props.handleClick()}>
        { props.value }
      </div>
    );
}