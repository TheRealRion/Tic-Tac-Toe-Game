import React from "react";

const Square = ({ squares, handleGamePlay, index, gameOn }) => {
  const handleClick = () => {
    if (gameOn) {
      handleGamePlay(index);
    } else if (!gameOn) {
      alert('Click "Play Again" for a rematch!');
    } else {
      alert(
        "Refresh the page and try again!"
      );
    }
  };

  return (
    <div className="square" onClick={handleClick}>
      {squares}
    </div>
  );
};

export default Square;
