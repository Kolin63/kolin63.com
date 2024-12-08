'use client';
import { useState } from 'react';

export default function Game()
{
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [green, setGreen] = useState([Array(9).fill(false)]);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares)
  {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  } 

  function jumpTo(nextMove)
  {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === currentMove)
      description = "You are at move #" + move;
    else if (move > 0)
      description = "Go to move #" + move;
    else
      description = "Go to game start";
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board isXNext={!(currentMove % 2)} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} green={green} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Square({ value, onSquareClick, green }) 
{
  return (
    <button 
      className={(green ? 'green-square' : 'square')}
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({isXNext, squares, onPlay, currentMove, green}) 
{
  function handleClick(i)
  {
    if ((squares[i] != null) || calculateWinner(squares, green))
      return;

    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O'; 
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares, green)
  let status;
  if (winner)
    status = "Winner: " + winner;
  else if (currentMove === 9)
    status = "Draw";
  else
    status = "Next player: " + (isXNext ? 'X' : 'O');

  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} green={green[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} green={green[1]} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} green={green[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} green={green[3]} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} green={green[4]} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} green={green[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} green={green[6]} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} green={green[7]} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} green={green[8]} />
      </div>
    </>
  )
}

function calculateWinner(squares, green)
{
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

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c] = lines[i]
    if ((squares[a] != null) && (squares[a] === squares[b]) && (squares[a] === squares[c]))
    {
      green[a] = true;
      green[b] = true;
      green[c] = true;

      return squares[a];
    }
    else
    {
      green[a] = false;
      green[b] = false;
      green[c] = false;
    }
  }
  return null;
}