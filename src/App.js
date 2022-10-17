import {
  isDisabled,
  setSelectionRange,
} from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import "./App.css";
import Square from "./components/Square";
// m
const App = () => {
  
  // contains square components
  const [squares, setSquares] = useState(Array(9).fill(null));
  // sets current player move
  const [player, setPlayer] = useState("❤︎");
  // sets message
  const [playerStatus, setPlayerStatus] = useState("Player 1, click a square to start!");
  //disable clicks on tie
  const [gameOn, setGameOn] = useState(true);

  


  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setPlayerStatus("Player 1, click a square to start!");
    setPlayer("❤︎");
    setGameOn(true);
  };
  //Win conditions//
  const calculateWinner = (squares) => {
    const winsArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winsArr.length; i++) {
      const [a, b, c] = winsArr[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        //Player wins if true
        return squares[a];
      }
    }
    // Otherwise, return null.
    return null;
  };

  //Checks for tie 
  const calculateTie = (squares) => {
    if (gameOn && squares.every((v) => v !== null)) {
      return true;
    } else {
      return false;
    }
  };

  // conditionals
  if (gameOn) {
    // if player 1 wins, stops game play
    if (calculateWinner(squares) === "❤︎") {
      setGameOn(false);
      setPlayerStatus("Player 1 wins!");
      // if player 2 wins, turns game off
    } else if (calculateWinner(squares) === "✯") {
      setGameOn(false);
      setPlayerStatus("Player 2 wins!");
    } else if (calculateTie(squares) === true) {
      setGameOn(false);
      setPlayerStatus("The cats win!! 🐱🐱🐱");
    }
  }

  // gameplay (onclick)//
  const handleGamePlay = (index) => {
    let updateBoard = [...squares];

    if (squares[index] === null) {
      updateBoard[index] = player;
      setSquares(updateBoard);
      setPlayer(player === "❤︎" ? "✯" : "❤︎");
      setPlayerStatus(
        player === "❤︎" ? "It's player 2's turn" : "It's player 1's turn"
      );
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="header">Want to play Tic-Tac-Toe?</h1>
        <div className="player">{playerStatus}</div>
        <div className="bg_wrap">
          <div className="gameboard">
            {squares.map((squares, index) => {
              return (
                <Square
                  gameOn={gameOn}
                  squares={squares}
                  handleGamePlay={handleGamePlay}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <a href="#" className="button" onClick={handleReset}>
          Play again?
        </a>
        <footer>
          <p className="footer">&copy; Alyssa Martin AKA, TheRealRion</p>
        </footer>
      </div>
    </>
  );
};

export default App;
