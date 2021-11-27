// Logic of game

export const TILE_STATUSES = {
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

export const markTile = (tile) => {
  if (
    tile.status !== TILE_STATUSES.HIDDEN &&
    tile.status !== TILE_STATUSES.MARKED
  ) {
    return;
  }

  if (tile.status === TILE_STATUSES.HIDDEN) {
    tile.status = TILE_STATUSES.MARKED;
  } else {
    tile.status = TILE_STATUSES.HIDDEN;
  }
};

export const revealTile = (board, tile) => {
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return;
  }

  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE;
    return;
  }

  tile.status = TILE_STATUSES.NUMBER;

  const adjacentTiles = nearbyTiles(board, tile);
  const mines = adjacentTiles.filter(tile => tile.mine);
  if (mines.length === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.element.textContent = mines.length;
  }
}

const nearbyTiles = (board, { x, y }) => {
  const tiles = []

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) {
        tiles.push(tile);
      }
    }
  }

  return tiles;
};

export const checkWin = (board) => {
  return board.every(row => {
    return row.every(tile => {
      return tile.status === TILE_STATUSES.NUMBER || (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED))
    })
  })
};

export const checkLose = (board) => {
  return board.some(row => {
    return row.some(tile => {
      return tile.status === TILE_STATUSES.MINE;
    })
  })
};