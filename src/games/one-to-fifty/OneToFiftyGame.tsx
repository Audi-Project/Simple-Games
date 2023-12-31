import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Variables } from '../../variables/Variables';
import GameModal from './components/GameModal';
import Timer from './components/Timer';
import useTimer from './hooks/useTimer';

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${Variables.colors.deepYellow};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const NumbersBoard = styled.section`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
`;

const shake = keyframes`
   0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
`;

const opacity = keyframes`
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`;

const zoomOut = keyframes`
  0% {
    scale: 1;
    opacity: 1;
  }
  50% {
    scale: 1.8;
  }
  100% {
    scale: 2;
    opacity: 0;
  }
`;

const NumberButton = styled.button`
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  background-color: #fff;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.6s;

  &.error {
    animation: ${shake} 1s ease-in-out;
  }

  &.success {
    opacity: 0;
    visibility: hidden;
    animation: ${zoomOut} 1s ease-in-out;
  }

  &.hint {
    animation: ${opacity} 1s ease infinite;
  }

  &:active {
    scale: 0.8;
  }

  &:hover {
    opacity: 0.6;
  }
`;

const ScoreCircle = styled.div`
  display: flex;
  background-color: ${Variables.colors.deepBlue};
  width: 120px;
  height: 120px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  gap: 5px;
`;

const CurrentScore = styled.span`
  color: ${Variables.colors.deepYellow};
  font-size: 40px;
  font-weight: bold;
`;

const LastNumber = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

const OneToFiftyGame = () => {
  const LAST_NUMBER = 50;
  const HINT_TIME = 5000;
  const ERROR_REMOVE_TIME = 400;
  const [numberArr, setNumberArr] = useState<number[]>([]);
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const buttonRef = useRef<null[] | HTMLButtonElement[]>([]);
  const buttonCurrent = buttonRef && buttonRef.current;

  const {
    isTimerStart,
    timeText,
    currentTimeNum,
    startTimer,
    endTimer,
    minusTime,
    initTimer,
  } = useTimer();

  //* 숫자 랜덤으로 표기
  useEffect(() => {
    const newNumberArr: number[] = [];

    for (let i = 0; i <= LAST_NUMBER; i++) {
      let randomNumber = 0;
      do {
        randomNumber = Math.floor(Math.random() * LAST_NUMBER) + 1;
      } while (newNumberArr.includes(randomNumber));

      newNumberArr.push(randomNumber);

      if (newNumberArr.length === 50) {
        break;
      }
    }
    setNumberArr(newNumberArr);
  }, []);

  //* hint 주기
  useEffect(() => {
    const buttonElement = buttonCurrent.filter(
      (buttonItem) => Number(buttonItem?.id) === currentNumber,
    );

    const eventHint = () => {
      buttonElement.forEach((buttonItem) => buttonItem?.classList.add('hint'));
    };

    const hintTimer = setTimeout(eventHint, HINT_TIME);

    return () => {
      clearTimeout(hintTimer);
    };
  }, [buttonCurrent, currentNumber]);

  const resetNumBtn = () => {
    if (isGameStart && !isTimerStart) {
      buttonCurrent.forEach((el) => {
        el?.classList.remove('success');
        el?.classList.remove('hint');
      });
    }
  };

  //* 게임 리셋
  const resetGame = () => {
    setIsGameStart(false);
    initTimer();
    setCurrentNumber(1);
    resetNumBtn();
  };

  const startGame = () => {
    setIsGameStart(true);
    startTimer();
  };

  const endGame = () => {
    endTimer();
  };

  //* 숫자 버튼 클릭 시
  const handleButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    targetNum: number,
  ) => {
    const buttonTarget = e.currentTarget;

    if (!isTimerStart && targetNum === 1) {
      startGame();
    }

    if (targetNum === 50 && currentNumber === 50) {
      endGame();
    }

    //* 동일한 숫자 인 경우
    if (currentNumber === targetNum) {
      setCurrentNumber((prevNumber) => prevNumber + 1);
      buttonTarget.classList.remove('hint');
      buttonTarget.classList.add('success');
    }

    //* 동일한 숫자가 아닌 경우
    if (currentNumber !== targetNum) {
      isTimerStart && minusTime();
      buttonTarget.classList.add('error');
      setTimeout(() => {
        buttonTarget.classList.remove('error');
      }, ERROR_REMOVE_TIME);
    }
  };

  return (
    <MainWrapper>
      {isGameStart && !isTimerStart && (
        <GameModal
          timeText={timeText}
          score={currentNumber}
          closeModal={resetGame}
          currentTimeNum={currentTimeNum}
        />
      )}

      <GameWrapper>
        <Timer timeText={timeText} />
        <NumbersBoard>
          {numberArr.map((item, idx) => (
            <NumberButton
              id={String(item)}
              key={item}
              onClick={(e) => handleButtonClick(e, item)}
              ref={(button) => (buttonRef.current[idx] = button)}
            >
              {item}
            </NumberButton>
          ))}
        </NumbersBoard>
        <ScoreCircle>
          <CurrentScore>{currentNumber - 1}</CurrentScore>
          <LastNumber>/ {LAST_NUMBER}</LastNumber>
        </ScoreCircle>
      </GameWrapper>
    </MainWrapper>
  );
};

export default OneToFiftyGame;
