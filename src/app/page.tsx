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
  const directions = [
    [-1, 0], // 上
    [-1, 1], // 右上
    [0, 1], // 右
    [1, 1], // 右下
    [1, 0], // 下
    [1, -1], // 左下
    [0, -1], // 左
    [-1, -1], // 左上
  ];
  const getValidMoves = (board: number[][], turn: number): [number, number][] => {
    const opponent = turn === 1 ? 2 : 1;
    const validMoves: [number, number][] = [];

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (board[y][x] !== 0) continue;

        for (const [dy, dx] of directions) {
          let ny = y + dy;
          let nx = x + dx;
          let foundOpponent = false;

          while (ny >= 0 && ny < 8 && nx >= 0 && nx < 8 && board[ny][nx] === opponent) {
            foundOpponent = true;
            ny += dy;
            nx += dx;
          }

          if (foundOpponent && ny >= 0 && ny < 8 && nx >= 0 && nx < 8 && board[ny][nx] === turn) {
            validMoves.push([y, x]);
            break;
          }
        }
      }
    }

    return validMoves;
  };

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    if (board[y][x] !== 0) return;
    const newBoard = structuredClone(board);

    let flipped = false;

    for (const [dy, dx] of directions) {
      let i = 1;
      const line: [number, number][] = [];

      while (true) {
        const ny = y + dy * i;
        const nx = x + dx * i;

        if (newBoard[ny] === undefined || newBoard[ny][nx] === undefined) {
          break;
        }

        const cell = newBoard[ny][nx];

        if (cell === 0) {
          break; // 空白なら終了
        } else if (cell === turnColor) {
          if (line.length > 0) {
            // 相手の石が1個以上あって自分の石にぶつかったら裏返す
            for (const [fy, fx] of line) {
              newBoard[fy][fx] = turnColor;
            }
            newBoard[y][x] = turnColor;
            flipped = true;
          }
          break;
        } else if (cell === 3 - turnColor) {
          line.push([ny, nx]); // 挟める可能性があるので記録
        }

        i++;
      }
    }

    // ひっくり返せた場合だけ手番交代
    if (flipped) {
      setTurnColor(3 - turnColor);
      // newBoard を setState で更新するなど
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
      <div className={styles.turnboard} />
      <div className={styles.textstyle4}>の番</div>
      <div className={styles.textstyle3}>{turnColor === 1 ? '黒' : '白'}</div>
      <div className={styles.scoreboard} />
      <div className={styles.textstyle2}>SCORE</div>
      <div className={styles.textstyle1}>
        <p>黒--{black}枚</p>
        <p>白--{white}枚</p>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color === 0 && <div className={styles.cellmark} />}
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
