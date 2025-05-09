'use client';

import { useState } from 'react';
import styles from './page.module.css';

const calcurateBlackPoint = (Board: number[][]) => {
  const black = Board.flat().filter((i) => i === 1).length;
  console.log(black);
  return black;
};
const calcurateWhitePoint = (Board: number[][]) => {
  const white = Board.flat().filter((i) => i === 2).length;
  console.log(white);
  return white;
};
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

const calcurateBoardWithCandidates = (Board: number[][], turnColor: number) => {
  const line: [number, number][] = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (Board[y][x] !== 0) {
        continue;
      }
      for (const [dy, dx] of directions) {
        let i = 1;

        const ny = y + dy;
        const nx = x + dx;
        if (Board[ny] === undefined) {
          continue;
        }
        if (Board[ny][nx] === 0 || Board[ny][nx] === turnColor) {
          continue;
        }

        while (true) {
          const ny = y + dy * i;
          const nx = x + dx * i;
          if (ny < 0 || ny >= 8 || nx < 0 || nx >= 8) {
            break;
          }
          if (Board[ny][nx] === 0) {
            break;
          }
          if (Board[ny][nx] === turnColor) {
            line.push([y, x]);
            break;
          }

          i++;
        }
      }
    }
  }
  console.log(line);
  return line;
};

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
  const markAction = () => {
    const newBoard = structuredClone(board);
    const line = calcurateBoardWithCandidates(newBoard, turnColor);
    for (const [ky, kx] of line) {
      newBoard[ky][kx] = 3;
    }
    return newBoard;
  };

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);

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

  return (
    <div className={styles.container}>
      <div className={styles.scoredesign}>
        <div className={styles.turnboard}>
          <div className={styles.textstyle3}>{turnColor === 1 ? '黒' : '白'}</div>
          <div className={styles.textstyle4}>の番</div>
        </div>
        <div className={styles.scoreboard}>
          <div className={styles.textstyle2}>SCORE</div>
          <div className={styles.textstyle1}>
            <p>黒--{calcurateBlackPoint(board)}枚</p>
            <p>白--{calcurateWhitePoint(board)}枚</p>
          </div>
        </div>
      </div>
      <div className={styles.board}>
        {markAction().map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 &&
                (color === 3 ? (
                  <div className={styles.cellmark} />
                ) : (
                  <div
                    className={styles.stone}
                    style={{ background: color === 1 ? '#000' : '#fff' }}
                  />
                ))}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
