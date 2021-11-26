// Logic of game

const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked"
}

export const createBoard = (boardSize, numOfMines) => {
  const board = [];
  const minePositions = getMinePositions(boardSize, numOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement('div');
      element.dataset.status = TILE_STATUSES.HIDDEN;
      row.push({
        element,
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          return (this.element.dataset.status = value);
        },
        x,
        y,
        mine: minePositions.some(positionsMatch.bind(null, { x, y })),
      });
    }
    board.push(row);
  }

  return board;
};

const getMinePositions = (boardSize, numOfMines) => {
  const positions = [];

  while (positions.length < numOfMines) {
    const position = {
      x: getRandomNumber(boardSize),
      y: getRandomNumber(boardSize),
    };
    if (!positions.some((p) => positionsMatch(p, position))) {
      positions.push(position);
    }
    // ALTERNATIVE WAY OF WRITING THE ABOVE
    // if (!positions.some(positionsMatch.bind(null, position))) {
    //   positions.push(position);
    // }
  }

  return positions;
};

const positionsMatch = (a, b) => {
  return a.x === b.x && a.y === b.y;
}

const getRandomNumber = (size) => {
  return Math.floor(Math.random() * size);
};