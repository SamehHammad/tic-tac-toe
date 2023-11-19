import React, { useState, useEffect } from "react";
import "./game.css";
import Square from "./Square";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { IoIosRefresh } from "react-icons/io";
import winImg from "../components/win.png";

const Game = ({ nameX, nameO }) => {
  const initialBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [turnX, setTurnX] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winningCells, setWinningCells] = useState([]);
  const [score, setScore] = useState({
    xScore: 0,
    oScore: 0,
  });

  useEffect(() => {
    // Check for a winner after each move
    checkWinner();
    if (gameOver) restart();
  }, [board]);

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        setGameOver(true);
        setWinningCells([
          [i, 0],
          [i, 1],
          [i, 2],
        ]);
        handleWinner(board[i][0]);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== ""
      ) {
        setGameOver(true);
        setWinningCells([
          [0, i],
          [1, i],
          [2, i],
        ]);
        handleWinner(board[0][i]);
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      setGameOver(true);
      setWinningCells([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
      handleWinner(board[0][0]);
      return;
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      setGameOver(true);
      setWinningCells([
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
      handleWinner(board[0][2]);
      return;
    }

    // Check for a draw
    if (!board.flat().includes("") && !gameOver) {
      setGameOver(true);
      Swal.fire({
        title: "DRAW!",
        text: `It's a draw!`,
        imageUrl: "https://img.youm7.com/large/smal4201013155625.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
  };

  const handleWinner = (winner) => {
    if (winner === "X") {
      setScore((prevScore) => ({
        ...prevScore,
        xScore: prevScore.xScore + 1,
      }));
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        oScore: prevScore.oScore + 1,
      }));
    }
    if (score.xScore == 25) {
      setTimeout(() => {
        Swal.fire({
          title: `🏆 Congratulations 🏆`,
          html: `<p style="color:#970140;font-size:25px;">  ${nameX}  won the round! </p>`,
          imageUrl: winImg,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
     
      }, 1000);
    } else if (score.oScore == 25) {
      setTimeout(() => {
        Swal.fire({
          title: `🏆 Congratulations 🏆`,
          html: `<p style="color:#970140;font-size:25px;">  ${nameO}  won the round! </p>`,
          imageUrl: winImg,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }, 1000);
    }
  };

  const restart = () => {
    setBoard(initialBoard);
    setGameOver(false);
    setWinningCells([]);
  };

  return (
    <div>
      <div className="scoreboard-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="xscore">{nameX}</th>
              <th className="oscore">{nameO}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="xscore">{score.xScore}</td>
              <td className="oscore">{score.oScore}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="game d-flex">
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              board={board}
              setBoard={setBoard}
              turnX={turnX}
              setTurnX={setTurnX}
              gameOver={gameOver}
              setGameOver={setGameOver}
              winningCells={winningCells}
            />
          ))
        )}
        <div className="btns mt-4 d-flex w-50">
          <IoIosRefresh onClick={restart} className="w-100 retry-btn" />
        </div>
      </div>
    </div>
  );
};

export default Game;
