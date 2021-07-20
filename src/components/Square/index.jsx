import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as Circle } from '../../assets/svg/o.svg';
import { ReactComponent as Cross } from '../../assets/svg/x.svg';

import './Square.scss';

const Square = ({ index, value, handleClick }) => {
  const symbolClasses = cx({
    square__value: true,
    [value]: value,
  });

  const setSymbol = () => {
    return value === 'x' ? <Cross /> : value === 'o' ? <Circle /> : '';
  };

  return (
    <button className='square' onClick={() => handleClick(index)}>
      <span className={symbolClasses}>{setSymbol()}</span>
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  index: PropTypes.number,
  setBoardCells: PropTypes.func,
  boardCells: PropTypes.array,
  xIsNext: PropTypes.bool,
  setXIsNext: PropTypes.func,
  isPlayerChosen: PropTypes.bool,
  isComputerChosen: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Square;
