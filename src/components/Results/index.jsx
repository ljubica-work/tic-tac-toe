import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './Results.scss';

const Results = ({ xIsNext, players, winner, totalWins }) => {
  const playersTurn = () => {
    if (winner) {
      return 'Game over';
    }
    if (xIsNext) {
      return `${players['x']}'s turn`;
    } else {
      return `${players['o']}'s turn`;
    }
  };
  return (
    <div className='results'>
      <div className='results__box'>
        <Button
          text={players['x']}
          type='x'
          xIsNext={xIsNext}
          disabled={true}
          score={totalWins}
        />
        <Button
          text={players['o']}
          type='o'
          xIsNext={xIsNext}
          disabled={true}
          score={totalWins}
        />
      </div>
      <div className='results__turn'>{playersTurn()}</div>
    </div>
  );
};

Results.propTypes = {
  xIsNext: PropTypes.bool,
  players: PropTypes.object,
  winner: PropTypes.string,
  totalWins: PropTypes.object,
};

export default Results;
