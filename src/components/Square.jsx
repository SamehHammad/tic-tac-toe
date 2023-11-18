import React from "react";
import "./game.css";

const Square = ({
  rowIndex,
  colIndex,
  board,
  setBoard,
  turnX,
  setTurnX,
  gameOver,
  winningCells,
}) => {
  const handleClick = () => {
    if (!board[rowIndex][colIndex] && !gameOver) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = turnX ? "X" : "O";
      setBoard(newBoard);
      setTurnX(!turnX);
    }
  };

  const isWinningCell = winningCells.some(
    ([winningRow, winningCol]) =>
      winningRow === rowIndex && winningCol === colIndex
  );

  return (
    <div
      className={`cell ${isWinningCell ? "winning-cell" : ""}`}
      onClick={handleClick}
      style={{
        color: "light" + (board[rowIndex][colIndex] === "X" ? "green" : "blue"),
      }}
    >
      <h1> {board[rowIndex][colIndex]}</h1>
    </div>
  );
};

export default Square;
