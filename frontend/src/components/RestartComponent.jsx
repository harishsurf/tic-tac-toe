import React from "react";

export const Restart = ({ socket }) => {
  const restartGame = () => {
    console.log("restrat");
    socket.emit("restart-game");
  };

  return (
    <div className="col ">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => restartGame()}
      >
        Restart
      </button>
    </div>
  );
};
