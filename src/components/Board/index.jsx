import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import getStrikethroughStyles from '../../helpers/strikethroughStyles';

import Square from '../Square';

import './Board.scss';

const WINNER_TIMEOUT = '1500';

const Board = ({
  xIsNext,
  setXIsNext,
  players,
  winner,
  boardCells,
  setBoardCells,
  winningIndex,
  gameWinner,
  isPlayerChosen,
  isComputerChosen,
  handleClick,
}) => {
  const [strikethroughStyle, setStrikethroughStyle] = useState(null);

  const winnerClasses = cx({
    board__winner: true,
    'board__winner--visible': winner || gameWinner === 'draw',
  });

  const tableClasses = cx({
    board__table: true,
    'board__table--hidden': winner || gameWinner === 'draw',
  });

  const strikethroughClasses = cx({
    board__strikethrough: true,
    'board__strikethrough--visible': winningIndex || winningIndex === 0,
  });

  const winOrDraw = () => {
    if (players[winner]) {
      return `${players[winner]} wins!`;
    } else if (gameWinner === 'draw') {
      return `${gameWinner}!`;
    }
  };

  useEffect(() => {
    if (winningIndex || winningIndex === 0) {
      const strikethroughTimeout = setTimeout(() => {
        setStrikethroughStyle(getStrikethroughStyles(winningIndex, gameWinner));
      }, WINNER_TIMEOUT - 1000);

      const winnerTimer = setTimeout(() => {
        setStrikethroughStyle(null);
        setBoardCells(Array(9).fill(''));
      }, WINNER_TIMEOUT);

      return () => {
        clearTimeout(winnerTimer);
        clearTimeout(strikethroughTimeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winningIndex]);

  const renderSquares = () => {
    return boardCells.map((value, index) => (
      <Square
        key={index}
        index={index}
        value={value}
        setBoardCells={setBoardCells}
        boardCells={boardCells}
        xIsNext={xIsNext}
        setXIsNext={setXIsNext}
        isPlayerChosen={isPlayerChosen}
        isComputerChosen={isComputerChosen}
        handleClick={handleClick}
      />
    ));
  };

  return (
    <div className='board'>
      <div className={tableClasses}>
        {renderSquares()}
        <div className={strikethroughClasses} style={strikethroughStyle}>
          <div className='board__strikethrough-inner'></div>
        </div>
      </div>
      <div className={winnerClasses}>
        <h1 className='board___winner-name'>{winOrDraw()}</h1>
      </div>
    </div>
  );
};

Board.propTypes = {
  xIsNext: PropTypes.bool,
  setXIsNext: PropTypes.func,
  players: PropTypes.object,
  winner: PropTypes.string,
  boardCells: PropTypes.array,
  setBoardCells: PropTypes.func,
  winningIndex: PropTypes.number,
  gameWinner: PropTypes.string,
  isPlayerChosen: PropTypes.bool,
  isComputerChosen: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Board;
