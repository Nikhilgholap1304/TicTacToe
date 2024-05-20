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
    <div className="w-full h-screen flex text-center m-auto items-center justify-center">
      {!mode ? (
        <div className="bg-emerald-400 p-7 rounded flex justify-center flex-col gap-6 shadow-md
        shadow-cyan-900">
          <h1 className="text-3xl font-bold">Choose Game Mode</h1>
          <div className="flex justify-evenly">
            <button onClick={() => chooseMode("twoPlayer")} className="bg-gray-700 px-4 py-2 rounded shadow-lg hover:scale-[0.97] transition-all">Two Player</button>
            <br></br>
            <button onClick={() => chooseMode("vsAI")} className="bg-gray-700 px-4 py-2 rounded shadow-lg hover:scale-[0.97] transition-all">You vs AI</button>
          </div>
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
