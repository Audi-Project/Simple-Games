import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Variables } from '../../variables/Variables';

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

const Timer = styled.p`
  font-size: 6.25rem;
  font-weight: bold;
  color: ${Variables.colors.deepBlue};
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
  const [numberArr, setNumberArr] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const buttonRef = useRef<null[] | HTMLButtonElement[]>([]);
  const LAST_NUMBER = 50;
  const TIME_OUT = 400;

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

  useEffect(() => {
    const currentEl = buttonRef.current?.filter(
      (el) => Number(el?.id) === currentNumber,
    );

    setTimeout(() => {
      currentEl.forEach((el) => el?.classList.add('hint'));
    }, 5000);

    console.log(buttonRef);
  }, [buttonRef, currentNumber]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>, targetNum: number) => {
    const target = e.currentTarget;

    if (currentNumber === targetNum) {
      setCurrentNumber((prev) => prev + 1);
      target.classList.remove('hint');
      target.classList.add('success');
    }

    if (currentNumber !== targetNum) {
      target.classList.add('error');
      setTimeout(() => {
        target.classList.remove('error');
      }, TIME_OUT);
    }
  };

  return (
    <MainWrapper>
      <GameWrapper>
        <Timer>00:00</Timer>
        <NumbersBoard>
          {numberArr.map((el, idx) => (
            <NumberButton
              id={String(el)}
              key={el}
              onClick={(e) => handleClick(e, el)}
              ref={(ref) => (buttonRef.current[idx] = ref)}
            >
              {el}
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
