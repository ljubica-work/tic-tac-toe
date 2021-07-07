import calculateWinner from './calculateWinner';

const getAvailableMoves = (boardCells) => {
  const moves = [];
  boardCells.forEach((cell, index) => {
    if (cell === '') moves.push(index);
  });
  return moves;
};

const isGameOver = (boardCells) => {
  if (calculateWinner(boardCells)) {
    return calculateWinner(boardCells);
  }

  if (!boardCells.some((cell) => cell === '')) {
    return 'draw';
  }

  return false;
};

const nodesMap = new Map();

const getBestMove = (boardCells, maximizing = true, depth = 0, maxDepth) => {
  if (depth === 0) nodesMap.clear();

  if (isGameOver(boardCells) || depth === maxDepth) {
    if (isGameOver(boardCells)['winningPlayer'] === 'x') {
      return 100 - depth;
    } else if (isGameOver(boardCells)['winningPlayer'] === 'o') {
      return -100 + depth;
    }
    return 0;
  }
  if (maximizing) {
    let best = -100;

    getAvailableMoves(boardCells).forEach((index) => {
      const childBoard = [...boardCells];
      childBoard[index] = 'x';

      const nodeValue = getBestMove(childBoard, false, depth + 1, maxDepth);
      best = Math.max(best, nodeValue);

      if (depth === 0) {
        const moves = nodesMap.has(nodeValue)
          ? `${nodesMap.get(nodeValue)},${index}`
          : index;
        nodesMap.set(nodeValue, moves);
      }
    });

    if (depth === 0) {
      let returnValue;
      if (typeof nodesMap.get(best) === 'string') {
        const arr = nodesMap.get(best).split(',');
        const rand = Math.floor(Math.random() * arr.length);
        returnValue = arr[rand];
      } else {
        returnValue = nodesMap.get(best);
      }

      return returnValue;
    }

    return best;
  }

  if (!maximizing) {
    let best = 100;
    getAvailableMoves(boardCells).forEach((index) => {
      const childBoard = [...boardCells];
      childBoard[index] = 'o';

      let nodeValue = getBestMove(childBoard, true, depth + 1, maxDepth);
      best = Math.min(best, nodeValue);

      if (depth === 0) {
        const moves = nodesMap.has(nodeValue)
          ? nodesMap.get(nodeValue) + ',' + index
          : index;
        nodesMap.set(nodeValue, moves);
      }
    });

    if (depth === 0) {
      let returnValue;
      if (typeof nodesMap.get(best) == 'string') {
        const arr = nodesMap.get(best).split(',');
        const rand = Math.floor(Math.random() * arr.length);
        returnValue = arr[rand];
      } else {
        returnValue = nodesMap.get(best);
      }

      return returnValue;
    }

    return best;
  }
};

const getRandomMove = (boardCells) => {
  const random = Math.floor(
    Math.random() * getAvailableMoves(boardCells).length,
  );
  return getAvailableMoves(boardCells)[random];
  //vraca index random slobodnog polja
};

export { getAvailableMoves, getBestMove, getRandomMove };
