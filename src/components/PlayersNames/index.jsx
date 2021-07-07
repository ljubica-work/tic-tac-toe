import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import routes from '../../constants/routes';

import Button from '../Button';
import DropMenu from '../DropMenu';

import './PlayersNames.scss';

const SELECT_OPTIONS = [
  {
    value: 3,
    name: 'Best of 3',
  },
  {
    value: 5,
    name: 'Best of 5',
  },
  {
    value: 7,
    name: 'Best of 7',
  },
];

const PlayersNames = ({
  visible,
  startGame,
  setPlayers,
  players,
  error,
  selectedOption,
  setSelectedOption,
  areNamesValid,
}) => {
  const classes = cx({
    'players-names': true,
    'players-names--visible': visible,
  });

  const handleChange = (e) => {
    setPlayers({
      ...players,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (areNamesValid()) {
      startGame();
    }
  };

  return (
    <div className={classes}>
      <label className='players-names__label'>Player X: </label>
      <input
        type='text'
        className='players-names__input'
        name='x'
        autoComplete='off'
        onChange={(e) => handleChange(e)}
      />

      <label className='players-names__label'>Player O: </label>
      <input
        type='text'
        className='players-names__input'
        name='o'
        autoComplete='off'
        onChange={(e) => handleChange(e)}
      />

      <DropMenu
        options={SELECT_OPTIONS}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        type='players'
      />
      <Button text='Start' onClick={handleClick} to={routes.PLAY} />
      <span className='players-names__error'>{error}</span>
    </div>
  );
};

PlayersNames.propTypes = {
  visible: PropTypes.bool,
  startGame: PropTypes.func,
  setPlayers: PropTypes.func,
  players: PropTypes.object,
  error: PropTypes.string,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedOption: PropTypes.func,
  areNamesValid: PropTypes.func,
};

export default PlayersNames;
