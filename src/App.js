import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes';
import useStateWithLocalStorage from './helpers/useStateWithLocalStorage';

import Start from './pages/Start';
import Game from './pages/Game';

function App() {
  const [selectedOption, setSelectedOption] = useStateWithLocalStorage(
    'selectedOption',
    5,
  );
  const [error, setError] = useStateWithLocalStorage('error', '');
  const [players, setPlayers] = useStateWithLocalStorage('players', {
    x: '',
    o: '',
  });
  const [isPlayerChosen, setIsPlayerChosen] = useStateWithLocalStorage(
    'isPlayerChosen',
    false,
  );
  const [isComputerChosen, setIsComputerChosen] = useStateWithLocalStorage(
    'isComputerChosen',
    false,
  );
  const [started, setStarted] = useStateWithLocalStorage('started', false);

  const areNamesValid = () => {
    if (Object.keys(players).some((key) => players[key] === '')) {
      setError("Names can't be empty");
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const startGame = () => {
    setStarted(true);
  };

  return (
    <div className='app'>
      <Switch>
        <Route exact path={routes.START}>
          <Start
            areNamesValid={areNamesValid}
            startGame={startGame}
            setPlayers={setPlayers}
            players={players}
            error={error}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isPlayerChosen={isPlayerChosen}
            setIsPlayerChosen={setIsPlayerChosen}
            isComputerChosen={isComputerChosen}
            setIsComputerChosen={setIsComputerChosen}
          />
        </Route>
        <Route path={routes.PLAY}>
          <Game
            players={players}
            selectedOption={selectedOption}
            isPlayerChosen={isPlayerChosen}
            isComputerChosen={isComputerChosen}
            started={started}
            setStarted={setStarted}
            setPlayers={setPlayers}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
