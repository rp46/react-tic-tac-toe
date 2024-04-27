import './styles.css';
import { useState } from 'react';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill('')]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentBoard = history[currentMove];
  const isXNext = currentMove%2 === 0;

  const handlePlay = (nextBoard) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextBoard];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };
  const moves = history.map((board, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board board={currentBoard} isXNext={isXNext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const Board = ({ board, isXNext, onPlay }) => {
  const winner = calculateWinner(board);
  let status;
  if(winner) {
    status = `Winner ${winner}`;
  } else {
    status = `Next player ${isXNext ? 'X' : 'O'}`;
  }
  
  const handleClick = (i) => {
    if(board[i] || calculateWinner(board)) {
      return;
    }
    const nextBoard = board.slice();
    if(isXNext) {
      nextBoard[i] = "X"
    } else {
      nextBoard[i] = "O";
    }
    onPlay(nextBoard);
  }
  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={board[0]} onSquareClick={() => handleClick(0)} />
        <Square value={board[1]} onSquareClick={() => handleClick(1)} />
        <Square value={board[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={board[3]} onSquareClick={() => handleClick(3)} />
        <Square value={board[4]} onSquareClick={() => handleClick(4)} />
        <Square value={board[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={board[6]} onSquareClick={() => handleClick(6)} />
        <Square value={board[7]} onSquareClick={() => handleClick(7)} />
        <Square value={board[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return '';
}

const Square = ({value, onSquareClick}) => {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
};
