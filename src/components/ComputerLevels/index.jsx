import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import routes from '../../constants/routes';

import DropMenu from '../DropMenu';
import Button from '../Button';

import './ComputerLevels.scss';

const COMPUTER_LEVELS = [
  {
    value: 1,
    name: 'Easy',
  },
  {
    value: 5,
    name: 'Medium',
  },
  {
    value: -1,
    name: 'Impossible',
  },
];

const ComputerLevels = ({
  visible,
  selectedOption,
  setSelectedOption,
  startGame,
  players,
  setPlayers,
}) => {
  const classses = cx({
    'computer-levels': true,
    'computer-levels--visible': visible,
  });

  const handleClick = () => {
    setPlayers({
      ...players,
      x: 'Player',
      o: 'Computer',
    });
    startGame();
  };

  return (
    <div className={classses}>
      <DropMenu
        options={COMPUTER_LEVELS}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        type='computer'
      />
      <Button text='Start' onClick={handleClick} to={routes.PLAY} />
    </div>
  );
};

ComputerLevels.propTypes = {
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedOption: PropTypes.func,
  visible: PropTypes.bool,
  startGame: PropTypes.func,
  setPlayers: PropTypes.func,
  players: PropTypes.object,
};
export default ComputerLevels;
