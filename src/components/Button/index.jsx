import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = ({ text, onClick, to, score, type, xIsNext, disabled }) => {
  const buttonClasses = cx({
    button: true,
    'button--active': (xIsNext && type === 'x') || (!xIsNext && type === 'o'),
    'button--disabled': disabled,
  });

  if (to) {
    return (
      <Link to={to} className={buttonClasses} onClick={onClick}>
        <span className='button__symbol'>{text}</span>
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      <span className='button__symbol'>{text}</span>
      {score && <span className='button__score'>{score[type]}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  score: PropTypes.object,
  type: PropTypes.string,
  xIsNext: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
