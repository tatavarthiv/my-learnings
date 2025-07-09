import { useState } from "react";

function Square({ value, onSquareClick, winner }) {
  return (
    <button
      className="square"
      style={winner ? { backgroundColor: "green" } : {}}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ turn, squares, onPlay }) {
  const [winner, winningSquares] = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (checkForDraw(squares)) {
    status = "Draw!";
  } else {
    status = "Next player: " + turn;
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = turn;
    onPlay(nextSquares);
  }

  const rows = Array(3)
    .fill(null)
    .map((_, row_idx) => {
      const cols = Array(3)
        .fill(null)
        .map((_, col_idx) => {
          const squareIndex = row_idx * 3 + col_idx;
          return (
            <Square
              key={squareIndex}
              value={squares[squareIndex]}
              onSquareClick={() => handleClick(squareIndex)}
              winner={winningSquares && winningSquares.includes(squareIndex)}
            />
          );
        });
      return (
        <div className="board-row" key={row_idx}>
          {cols}
        </div>
      );
    });

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const turn = currentMove % 2 === 0 ? "X" : "O";
  const currSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move == 0) {
      description = "Go to game start";
    } else if (move == currentMove) {
      description = "You are at move #" + move;
    } else {
      description = "Go to move #" + move;
    }
    return (
      <li key={move}>
        <button onClick={() => setCurrentMove(move)}>{description}</button>
      </li>
    );
  });

  if (!isAscending) {
    moves = moves.slice().reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board turn={turn} squares={currSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscending(!isAscending)}>
          sort moves {isAscending ? "descending" : "ascending"}
        </button>
        {moves}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [null, null];
}

function checkForDraw(squares) {
  return squares.every((square) => square != null);
}
