import { createBoard } from "./minesweeper.js"
// Display/UI of game

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;

// (1) Populate a board with tiles/mines
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector('[data-mine-count]');

board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element);
  })
})
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

// (2) Left click on tiles
  // (a) Reveal tiles
// (3) Right click on tiles
  // (a) Mark tiles
// (4) Check for win/lose
