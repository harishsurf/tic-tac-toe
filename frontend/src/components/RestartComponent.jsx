import React from "react";

export const Restart = ({ socket }) => {
  const restartGame = () => {};

  return (
    <div className="col text-center pt-3">
      <button
        type="button"
        className="btn btn-primary "
        onClick={() => restartGame}
      >
        Restart
      </button>
    </div>
  );
};
