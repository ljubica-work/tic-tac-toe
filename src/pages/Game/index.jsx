import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import calculateWinner from '../../helpers/calculateWinner';
import useStateWithLocalStorage from '../../helpers/useStateWithLocalStorage';
import { getBestMove } from '../../helpers/computersMove';
import routes from '../../constants/routes';
import { Link } from 'react-router-dom';

import gameWinSound from '../../assets/sounds/game_win_sound.mp3';
import playerXAudio from '../../assets/sounds/click_sound_player_one.mp3';
import playerOAudio from '../../assets/sounds/click_sound_player_two.mp3';

import Board from '../../components/Board';
import Results from '../../components/Results';

import './Game.scss';

const WINNER_TIMEOUT = '1500';

const Game = ({
  players,
  selectedOption,
  isPlayerChosen,
  isComputerChosen,
  started,
  setStarted,
  setPlayers,
}) => {
  const [xIsNext, setXIsNext] = useStateWithLocalStorage('xIsNext', true);
  const [boardCells, setBoardCells] = useStateWithLocalStorage(
    'boardCells',
    Array(9).fill(''),
  );
  const [gameWinner, setGameWinner] = useStateWithLocalStorage(
    'gameWinner',
    null,
  );
  const [matchWinner, setMatchWinner] = useStateWithLocalStorage(
    'matchWinner',
    null,
  );
  const [totalWins, setTotalWins] = useStateWithLocalStorage('totalWins', {
    x: 0,
    o: 0,
  });
  const [winningIndex, setWinningIndex] = useState(null);

  const [audio, setAudio] = useState(null);

  const [chosenSymbol, setChosenSymbol] = useStateWithLocalStorage(
    'chosenSymbol',
    'x',
  );

  const [isComputersMove, setIsComputersMove] = useStateWithLocalStorage(
    'isComputersMove',
    false,
  );

  const setPlayerNames = (xPlayer, oPlayer) => {
    setPlayers({
      ...players,
      x: xPlayer,
      o: oPlayer,
    });
  };

  const switchPlayer = () => {
    resetGame();
    if (chosenSymbol === 'x') {
      setChosenSymbol('o');
      setXIsNext(true);
      setIsComputersMove(true);
      setPlayerNames('Computer', 'Player');
    } else if (chosenSymbol === 'o') {
      setChosenSymbol('x');
      setPlayerNames('Player', 'Computer');
    }
  };

  const resetGame = () => {
    setMatchWinner(null);
    setGameWinner(null);
    setBoardCells(Array(9).fill(''));
    setWinningIndex(null);
    setXIsNext(true);
    const resetTotalWins = {
      x: 0,
      o: 0,
    };
    setTotalWins(resetTotalWins);
    if (isComputerChosen && chosenSymbol === 'o') {
      setXIsNext(true);
      setIsComputersMove(true);
    }
  };

  useEffect(() => {
    if (xIsNext) {
      setAudio(new Audio(playerXAudio));
    } else {
      setAudio(new Audio(playerOAudio));
    }
    return () => {
      setAudio(null);
    };
  }, [xIsNext]);

  useEffect(() => {
    if (calculateWinner(boardCells)) {
      const tmpGameWinner = calculateWinner(boardCells)['winningPlayer'];
      const numberOfWins = totalWins[tmpGameWinner];
      setTotalWins({
        ...totalWins,
        [tmpGameWinner]: numberOfWins + 1,
      });
      setGameWinner(tmpGameWinner);
      setWinningIndex(calculateWinner(boardCells)['winningIndex']);
      const gameWinAudio = new Audio(gameWinSound);
      gameWinAudio.play();
      setStarted(false);
    } else if (!boardCells.some((cell) => cell === '')) {
      setGameWinner('draw');
      setStarted(false);
      const drawTimer = setTimeout(() => {
        setGameWinner(null);
        setBoardCells(Array(9).fill(''));
      }, 1500);

      return () => {
        clearTimeout(drawTimer);
      };
    }

    return () => {
      setGameWinner(null);
      setWinningIndex(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardCells]);

  useEffect(() => {
    if (isPlayerChosen) {
      let bestScore = Object.keys(totalWins).filter(
        (key) => totalWins[key] > selectedOption / 2,
      );
      if (bestScore.length > 0) {
        const matchWinnerTimer = setTimeout(() => {
          setMatchWinner(bestScore[0]);
        }, WINNER_TIMEOUT);

        return () => {
          clearTimeout(matchWinnerTimer);
        };
      }
    }
    setXIsNext(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameWinner]);

  useEffect(() => {
    if (isComputerChosen) {
      if (isComputersMove) {
        const maxDepth = Number(selectedOption);
        let isMaximizing;
        let computerSymbol;
        if (chosenSymbol === 'x' && !xIsNext) {
          isMaximizing = false;
          computerSymbol = 'o';
        } else if (chosenSymbol === 'o' && xIsNext) {
          isMaximizing = true;
          computerSymbol = 'x';
        }
        const computerMoveTimeout = setTimeout(() => {
          const computerMooveIndex = getBestMove(
            boardCells,
            isMaximizing,
            0,
            maxDepth,
          );
          const tmpBoardCellsNew = [...boardCells];
          tmpBoardCellsNew[computerMooveIndex] = computerSymbol;
          setBoardCells(tmpBoardCellsNew);
          setXIsNext(!xIsNext);
          setIsComputersMove(false);
          audio.play();
          console.log(boardCells);
        }, 1000);

        return () => {
          clearTimeout(computerMoveTimeout);
        };
      }
    }
  }, [
    audio,
    boardCells,
    chosenSymbol,
    isComputerChosen,
    isComputersMove,
    selectedOption,
    setBoardCells,
    setIsComputersMove,
    setXIsNext,
    xIsNext,
  ]);

  useEffect(() => {
    if (!gameWinner) {
      if (chosenSymbol === 'o') {
        setXIsNext(true);
        setIsComputersMove(true);
      }
      return () => {
        setIsComputersMove(false);
      };
    }
  }, [chosenSymbol, gameWinner, setIsComputersMove, setXIsNext]);

  const handleClick = (index) => {
    const tmpBoardCells = [...boardCells];
    if (tmpBoardCells[index] === '' && !calculateWinner(boardCells)) {
      tmpBoardCells[index] = xIsNext ? 'x' : 'o';
      setBoardCells(tmpBoardCells);
      setXIsNext(!xIsNext);
      setIsComputersMove(true);
      audio.play();
    }
  };

  return (
    <div className='game'>
      <Results
        xIsNext={xIsNext}
        players={players}
        winner={gameWinner}
        totalWins={totalWins}
      />
      {isComputerChosen ? (
        <button
          onClick={switchPlayer}
          className='game__button game__button--symbol'
        >
          Playing as <span className='game__chosen-symbol'>{chosenSymbol}</span>
        </button>
      ) : (
        ''
      )}
      <Board
        xIsNext={xIsNext}
        setXIsNext={setXIsNext}
        players={players}
        winner={matchWinner}
        gameWinner={gameWinner}
        winningIndex={winningIndex}
        boardCells={boardCells}
        setBoardCells={setBoardCells}
        isPlayerChosen={isPlayerChosen}
        isComputerChosen={isComputerChosen}
        handleClick={handleClick}
      />
      <button className='game__button game__button--reset' onClick={resetGame}>
        RESET GAME
      </button>
      <Link className='game__button game__button--back' to={routes.START}>
        &larr; BACK
      </Link>
    </div>
  );
};

Game.propTypes = {
  players: PropTypes.object,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPlayerChosen: PropTypes.bool,
  isComputerChosen: PropTypes.bool,
  started: PropTypes.bool,
  setStarted: PropTypes.func,
  setPlayers: PropTypes.func,
};

export default Game;
