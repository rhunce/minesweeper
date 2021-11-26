import { createBoard, markTile, TILE_STATUSES } from './minesweeper.js';
// Display/UI of game

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;

// (1) Populate a board with tiles/mines

// (3) Right click on tiles
  // (a) Mark tiles

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector('[data-mine-count]');

board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {})
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

// (2) Left click on tiles
  // (a) Reveal tiles

// (4) Check for win/lose
