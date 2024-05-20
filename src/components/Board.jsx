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

  useEffect(() => {
    setWinner(checkWinner(board));
    if (mode === "vsAI" && !isPlayerTurn && !winner) {
      const emptyIndexes = board.reduce(
        (acc, val, idx) => (val === null ? acc.concat(idx) : acc),
        []
      );
      const randomIndex =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      if (randomIndex !== undefined) handleClick(randomIndex);
    }
  }, [board, isPlayerTurn, mode, winner]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div>
        {board.map((value, index) => (
          <div key={index} onClick={() => handleClick(index)}>
            {value}
          </div>
        ))}
      </div>
      {winner && (
        <div>
          <h2>{winner === "Draw" ? "Its's a Draw" : `Winner: ${winner}`}</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Board;
