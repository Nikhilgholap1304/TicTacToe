import React, { useState, useEffect } from "react";

const Board = ({ mode, resetGame, isPlayerTurn, setIsPlayerTurn }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isPlayerTurn ? "X" : "O";
    setBoard(newBoard);
    setIsPlayerTurn(!isPlayerTurn);
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.every(Boolean) ? "Draw" : null;
  };

  const bestMove = () => {
    const emptyIndexes = board.reduce(
      (acc, val, idx) => (val === null ? acc.concat(idx) : acc),
      []
    );

    //try to win
    for (let index of emptyIndexes) {
      const newBoard = [...board];
      newBoard[index] = "O";
      if (checkWinner(newBoard) === "O") return index;
    }
    // Block opponent from winning
    for (let index of emptyIndexes) {
      const newBoard = [...board];
      newBoard[index] = "X";
      if (checkWinner(newBoard) === "X") return index;
    }

    // Pick a center, corner, or side in order of priority
    const center = 4;
    if (emptyIndexes.includes(center)) return center;

    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
      if (emptyIndexes.includes(corner)) return corner;
    }

    const sides = [1, 3, 5, 7];
    for (let side of sides) {
      if (emptyIndexes.includes(side)) return side;
    }

    // Default to random move if all else fails
    return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  };

  useEffect(() => {
    setWinner(checkWinner(board));
    if (mode === "vsAI" && !isPlayerTurn && !winner) {
      const aiMove = bestMove();
      if (aiMove !== undefined) handleClick(aiMove);
    }
  }, [board, isPlayerTurn, mode, winner]);

  return (
    <div>
      <h1 className="text-3xl mb-10 font-bold">Tic Tac Toe</h1>
      <div className="w-fit grid grid-cols-3 grid-rows-3 gap-2">
        {board.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 flex justify-center items-center border-[2px] border-solid border-[#a4ffd6] text-2xl cursor-pointer rounded"
          >
            <h1 className="text-5xl font-bold text-[#8dffab]">{value}</h1>
          </div>
        ))}
      </div>
      {winner && (
        <div className="border border-solid border-emerald-200 mt-5 p-4 rounded">
          <h2 className="text-2xl">{winner === "Draw" ? "Its's a Draw" : `Winner is ' ${winner} '`}</h2>
          <button onClick={resetGame} className="px-4 py-2 bg-emerald-300 rounded-sm mt-3 text-gray-700 font-bold hover:scale-[0.98] transition">Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Board;
