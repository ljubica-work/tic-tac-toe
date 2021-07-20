import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import PlayersNames from '../../components/PlayersNames';
import ComputerLevels from '../../components/ComputerLevels';

import './Start.scss';

const Start = ({
  startGame,
  setPlayers,
  players,
  error,
  selectedOption,
  setSelectedOption,
  areNamesValid,
  isPlayerChosen,
  setIsPlayerChosen,
  isComputerChosen,
  setIsComputerChosen,
}) => {
  const choosePlayer = () => {
    setIsPlayerChosen(true);
    setIsComputerChosen(false);
    setSelectedOption(5);
  };

  const chooseComputer = () => {
    setIsComputerChosen(true);
    setIsPlayerChosen(false);
    setSelectedOption(5);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className='start'>
      <div className='start__buttons'>
        <Button
          text='Play a game against the computer'
          onClick={chooseComputer}
        />
        <Button text='Play a game against a friend' onClick={choosePlayer} />
      </div>
      {isPlayerChosen ? (
        <PlayersNames
          visible={isPlayerChosen}
          startGame={startGame}
          setPlayers={setPlayers}
          players={players}
          areNamesValid={areNamesValid}
          error={error}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ) : (
        <ComputerLevels
          visible={isComputerChosen}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          startGame={startGame}
          setPlayers={setPlayers}
          players={players}
        />
      )}
    </div>
  );
};

Start.propTypes = {
  startGame: PropTypes.func,
  setPlayers: PropTypes.func,
  players: PropTypes.object,
  error: PropTypes.string,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedOption: PropTypes.func,
  areNamesValid: PropTypes.func,
  isPlayerChosen: PropTypes.bool,
  setIsPlayerChosen: PropTypes.func,
  isComputerChosen: PropTypes.bool,
  setIsComputerChosen: PropTypes.func,
};

export default Start;
