import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import {
  getDataFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStroage';
import Modal from './components/Modal';
import ArrowBeat from './constatns/arrow-beat';
import Game from './constatns/game';
import useTimer from './hooks/useTimer';

const game = new Game();
let allArrowBeats = game.generateBeats();

type TextMaxScoreProps = {
  right?: boolean;
};

// components
const MainWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const ArrowBeatIcon = styled.div`
  width: 70px;
  height: 70px;
  border: 5px solid #222;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin: 10px;
  font-size: 36px;
`;

const TextScoreWrapper = styled.div<TextMaxScoreProps>`
  position: absolute;
  ${(props) => (props.right ? `right: 0;` : `left: 0;`)}
  bottom: 300px;
  text-transform: uppercase;
  text-align: center;
`;

const TextMaxScore = styled.div`
  font-size: 14px;
`;

const TextScore = styled.div`
  font-size: 24px;
`;

const Information = styled.div`
  margin-top: 48px;
  text-align: center;
`;

function LeftRightGame() {
  const [currentUserInput, setCurrentUserInput] = useState('');
  const [beats, setBeats] = useState<ArrowBeat[]>(allArrowBeats);
  const [currentBeats, setCurrentBeats] = useState<ArrowBeat[]>(
    allArrowBeats.slice(-5),
  );
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxScore, setMaxScore] = useState(
    Number(getDataFromLocalStorage('MaxScore')) || 0,
  );
  const [maxCombo, setMaxCombo] = useState(
    Number(getDataFromLocalStorage('MaxCombo')) || 0,
  );
  const [isGameStart, setIsGameStart] = useState(false);

  const { isTimerStart, timeText, startTimer, addTime, minusTime, initTimer } =
    useTimer();

  const inputHandler = (e: KeyboardEvent) => {
    const key = e.key;

    if (key !== 'ArrowLeft' && key !== 'ArrowRight') {
      setCurrentUserInput('');
      return;
    }

    if (!isTimerStart && !isGameStart) {
      startTimer();
      setIsGameStart(true);
    }

    setCurrentUserInput(key);
    correctTarget(key);
  };

  const correctTarget = (key: string) => {
    if (key === currentBeats[currentBeats.length - 1].arrow) {
      allArrowBeats.pop();
      setBeats(allArrowBeats);
      setCurrentBeats(beats.slice(-5));

      setCombo((combo) => {
        const currentCombo = combo + 1;
        setMaxCombo((prev) => {
          if (prev < currentCombo) {
            saveToLocalStorage({ key: 'MaxCombo', value: `${currentCombo}` });
            return Math.max(prev, currentCombo);
          }
          return prev;
        });
        setScore((prev) => {
          const currentScore = prev + (10 * combo + Math.abs(10 - combo));
          // console.log(`combo ${combo} : ${10 * combo + Math.abs(10 - combo)}`);
          setMaxScore((prev) => {
            if (prev < currentScore) {
              saveToLocalStorage({ key: 'MaxScore', value: `${currentScore}` });
              return Math.max(prev, currentScore);
            }

            return prev;
          });

          return currentScore;
        });
        return currentCombo;
      });

      if (isTimerStart) {
        addTime();
      }
    } else {
      setCombo(0);
      minusTime();
    }
  };

  const initGame = () => {
    allArrowBeats = game.generateBeats();

    initTimer();
    setScore(0);
    setCombo(0);
  };

  const endGame = () => {
    setIsGameStart(false);
    initGame();
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', inputHandler);

    return () => {
      document.removeEventListener('keydown', inputHandler);
    };
  }, [currentBeats, isGameStart]);

  return (
    <MainWrapper>
      {currentBeats.map((arrow) => {
        return (
          <ArrowBeatIcon data-id={arrow.id} key={arrow.id}>
            {arrow.arrow === 'ArrowLeft' ? '←' : '→'}
          </ArrowBeatIcon>
        );
      })}

      <TextScoreWrapper>
        <TextMaxScore>
          <p>MAX-SCORE</p>
          <p>{maxScore}</p>
        </TextMaxScore>
        <TextScore>
          <p>score</p>
          <p>{score}</p>
        </TextScore>
      </TextScoreWrapper>
      <TextScoreWrapper right={true}>
        <TextMaxScore>
          <p>MAX-COMBO</p>
          <p>{maxCombo}</p>
        </TextMaxScore>
        <TextScore>
          <p>combo</p>
          <p>{combo}</p>
        </TextScore>
      </TextScoreWrapper>
      <Information>
        <div>
          current input : {currentUserInput === 'ArrowLeft' ? '←' : '→'}
        </div>
        <p>{timeText}</p>
      </Information>
      {isGameStart && !isTimerStart && (
        <Modal score={score} onClose={endGame} />
      )}
    </MainWrapper>
  );
}

export default LeftRightGame;
