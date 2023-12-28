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

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const game = new Game();
let allArrowBeats = game.generateBeats();

type TextMaxScoreProps = {
  right?: boolean;
};

type TimeLoadingProps = {
  value: number;
};

const updateTimerText = (time: number) => {
  const ms = time % 1000;
  const second = (time - ms) / 1000;
  return `${second}.${ms}`;
};

// components
const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #faeece;
`;

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
  color: #233868;
`;

const ArrowBeatIcon = styled.div`
  width: 70px;
  height: 70px;
  border: 5px solid #ec6e5d;
  border-radius: 100%;
  background-color: #ec6e5d;
  color: white;
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
  position: absolute;
  top: 48px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  text-align: center;
`;

const TimeLoadingBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  margin-bottom: 16px;
`;

const TimeLoadingBarBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 24px;
`;

const TimeLoadingBarForeground = styled.div<TimeLoadingProps>`
  position: absolute;
  width: ${(props) => (Number(props.value) / 10000) * 100}%;
  height: 100%;
  background: #f0c446;
  border-radius: 24px;
`;

function LeftRightGame() {
  const [badGood, setBadGood] = useState('');
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

  // console.log(Number(timeText));
  const inputHandler = (e: KeyboardEvent) => {
    const key = e.key;

    if (key !== 'ArrowLeft' && key !== 'ArrowRight') {
      return;
    }

    if (!isTimerStart && !isGameStart) {
      startTimer();
      setIsGameStart(true);
    }

    correctTarget(key);
  };

  const correctTarget = (key: string) => {
    if (key === currentBeats[currentBeats.length - 1].arrow) {
      allArrowBeats.pop();
      setBeats(allArrowBeats);
      setCurrentBeats(beats.slice(-5));
      setBadGood('Good!!!');
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
      setBadGood('Ooooooops🤣💩');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => endGame();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', inputHandler);

    return () => {
      document.removeEventListener('keydown', inputHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBeats, isGameStart]);

  return (
    <Background>
      <MainWrapper>
        <Information>
          <TimeLoadingBarWrapper>
            <TimeLoadingBarBackground />
            <TimeLoadingBarForeground value={timeText} />
          </TimeLoadingBarWrapper>
          <p>{updateTimerText(timeText)}s</p>
        </Information>
        {currentBeats.map((arrow) => {
          return (
            <ArrowBeatIcon data-id={arrow.id} key={arrow.id}>
              {arrow.arrow === 'ArrowLeft' ? <FaArrowLeft /> : <FaArrowRight />}
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
        <div>
          <p>{badGood}</p>
        </div>
        {isGameStart && !isTimerStart && (
          <Modal score={score} onClose={endGame} />
        )}
      </MainWrapper>
    </Background>
  );
}

export default LeftRightGame;
