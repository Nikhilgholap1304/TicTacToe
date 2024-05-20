import React, { useState } from "react";
import Board from "./Board";

const TTTGame = () => {
  const [mode, setMode] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const chooseMode = (selectedMode) => {
    setMode(selectedMode);
  };

  const resetGame = () => {
    setMode(null);
    setIsPlayerTurn(true);
  };

  return (
    <div>
      {!mode ? (
        <div>
          <h1>Choose Game Mode</h1>
          <button onClick={() => chooseMode("twoPlayer")}>Two Player</button><br></br>
          <button onClick={() => chooseMode("vsAI")}>You vs AI</button>
        </div>
      ) : (
        <Board
          mode={mode}
          resetGame={resetGame}
          isPlayerTurn={isPlayerTurn}
          setIsPlayerTurn={setIsPlayerTurn}
        />
      )}
    </div>
  );
};

export default TTTGame;
