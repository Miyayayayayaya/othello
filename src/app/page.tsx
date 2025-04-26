'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);

    //Ｙ座標↓

    let i = 1;
    while (board[y + i] !== undefined && board[y + i][x] === 3 - turnColor) {
      console.log('↓');
      console.log(i);
      i++;
      if (board[y + i] !== undefined && board[y + i][x] === 0) {
        i = 1;
        break;
      }
    }
    if (i > 1 && board[y + i] !== undefined && board[y + i][x] === turnColor) {
      newBoard[y][x] = turnColor;
      for (let k = 1; k < i; k++) {
        newBoard[y + k][x] = turnColor;
      }
      setTurnColor(3 - turnColor);
    }
    //Ｙ座標↑
    i = 1;
    while (board[y - i] !== undefined && board[y - i][x] === 3 - turnColor) {
      console.log('↑');
      console.log(i);
      i++;
      if (board[y - i] !== undefined && board[y - i][x] === 0) {
        i = 1;
        break;
      }
    }
    if (i > 1 && board[y - i] !== undefined && board[y - i][x] === turnColor) {
      newBoard[y][x] = turnColor;
      for (let k = 1; k < i; k++) {
        newBoard[y - k][x] = turnColor;
      }
      setTurnColor(3 - turnColor);
    }
    //Ｘ座標→
    i = 1;
    while (board[x + i] !== undefined && board[y][x + i] === 3 - turnColor) {
      console.log('→');
      console.log(i);
      i++;
      if (board[x + i] !== undefined && board[y][x + i] === 0) {
        i = 1;
        break;
      }
    }
    if (i > 1 && board[x + i] !== undefined && board[y][x + i] === turnColor) {
      newBoard[y][x] = turnColor;
      for (let k = 1; k < i; k++) {
        newBoard[y][x + k] = turnColor;
      }
      setTurnColor(3 - turnColor);
    }
    //X座標←
    i = 1;
    while (board[x - i] !== undefined && board[y][x - i] === 3 - turnColor) {
      console.log('←');
      console.log(i);
      i++;
      if (board[x - i] !== undefined && board[y][x - i] === 0) {
        i = 1;
        break;
      }
    }
    if (i > 1 && board[x - i] !== undefined && board[y][x - i] === turnColor) {
      newBoard[y][x] = turnColor;
      for (let k = 1; k < i; k++) {
        newBoard[y][x - k] = turnColor;
      }
      setTurnColor(3 - turnColor);
    }
    //↘
    i = 1;
    while (
      board[y + i] !== undefined &&
      board[y + i][x + i] !== undefined &&
      board[y + i][x + i] === 3 - turnColor
    ) {
      console.log('↘');
      console.log(i);
      i++;
      if (
        board[y + i] !== undefined &&
        board[y + i][x + i] !== undefined &&
        board[y + i][x + i] === 0
      ) {
        i = 1;
        break;
      }
    }
    if (
      i > 1 &&
      board[y + i] !== undefined &&
      board[y + i][x + i] !== undefined &&
      board[y + i][x + i] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      for (let k = 1; k < i; k++) {
        newBoard[y + k][x + k] = turnColor;
      }
      setTurnColor(3 - turnColor);
    }
    //↗
    i = 1;
    while (
      board[y - i] !== undefined &&
      board[y - i][x + i] !== undefined &&
      board[y - i][x + i] === 3 - turnColor
    ) {
      console.log('↗');
      console.log(i);
      i++;
      if (
        board[y - i] !== undefined &&
        board[y - i][x + i] !== undefined &&
        board[y - i][x + i] === 0
      ) {
        i = 1;
        break;
      }
    }
    if (
      i > 1 &&
      board[y - i] !== undefined &&
      board[y - i][x + i] !== undefined &&
      board[y - i][x + i] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      for (let k = 1; k < i; k++) {
        newBoard[y - k][x + k] = turnColor;
      }
      setTurnColor(3 - turnColor);
    }
    //↖
    i = 1;
    while (
      board[y - i] !== undefined &&
      board[y - i][x - i] !== undefined &&
      board[y - i][x - i] === 3 - turnColor
    ) {
      console.log('↖');
      console.log(i);
      i++;
      if (
        board[y - i] !== undefined &&
        board[y - i][x - i] !== undefined &&
        board[y - i][x - i] === 0
      ) {
        i = 1;
        break;
      }
    }
    if (
      i > 1 &&
      board[y - i] !== undefined &&
      board[y - i][x - i] !== undefined &&
      board[y - i][x - i] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      for (let k = 1; k < i; k++) {
        newBoard[y - k][x - k] = turnColor;
      }
      setTurnColor(3 - turnColor);
    }
    //↙
    i = 1;
    while (
      board[y + i] !== undefined &&
      board[y + i][x - i] !== undefined &&
      board[y + i][x - i] === 3 - turnColor
    ) {
      console.log('↙');
      console.log(i);
      i++;
      if (
        board[y + i] !== undefined &&
        board[y + i][x - i] !== undefined &&
        board[y + i][x - i] === 0
      ) {
        i = 1;
        break;
      }
    }
    if (
      i > 1 &&
      board[y + i] !== undefined &&
      board[y + i][x - i] !== undefined &&
      board[y + i][x - i] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      for (let k = 1; k < i; k++) {
        newBoard[y + k][x - k] = turnColor;
      }
      setTurnColor(3 - turnColor);
    }
    setBoard(newBoard);
  };
  let white = 0;
  let black = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell === 1) {
        black++;
      } else if (cell === 2) {
        white++;
      }
    }
  }
  console.log('黒', black, '白', white);

  return (
    <div className={styles.container}>
      <div className={styles.scoreboard} />
      <div id="black">黒</div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
