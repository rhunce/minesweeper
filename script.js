// Display/UI of game

import {
  createBoard,
  markTile,
  revealTile,
  TILE_STATUSES,
  checkWin,
  checkLose
} from './minesweeper.js';

// (1) Populate a board with tiles/mines
// (2) Left click on tiles
  // (a) Reveal tiles
  // (3) Right click on tiles
  // (a) Mark tiles
// (4) Check for win/lose
const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 3;


const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector('[data-mine-count]');
const messageText = document.querySelector(".subtext")

board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd();
    })
    tile.element.addEventListener("contextmenu", e => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    })
  })
})
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

const listMinesLeft = () => {
  const markedTilesCount = board.reduce((count, row) => {
    return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length;
  }, 0)

  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

const checkGameEnd = () => {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true })
    boardElement.addEventListener("contextmenu", stopProp, { capture: true })
  }

  if (win) {
    messageText.textContent = "You Win";
  }

  if (lose) {
    messageText.textContent = 'You Lose';
    board.forEach(row => {
      row.forEach(tile => {
        if (tile.status === TILE_STATUSES.MARKED) {
          markTile(tile);
        }
        if (tile.mine) {
          revealTile(board, tile);
        }
      })
    })

  }
};

const stopProp = (e) => {
  e.stopImmediatePropagation();
};