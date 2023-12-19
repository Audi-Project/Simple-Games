import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import playerIcon from '../../../assets/avoid-devil/player-icon.svg';
import Devil from '../components/Devil';
import StopWatch from '../components/StopWatch';

const getRandomCoordinate = Math.floor(Math.random() * 100);

export default function AvoidDevil() {
  const [isStart, setIsStart] = useState(false);
  const [devils, setDevils] = useState<NewDevilType[]>([]);
  const [devilGoals, setDevilGoals] = useState<DevilGoalsType[]>([]);
  const [playerPosition, setPlayerPosition] = useState({ top: 80, left: 50 });
  const playerIconRef = useRef<HTMLImageElement>(null);

  const movePlayerHandler = (e: React.KeyboardEvent<HTMLImageElement>) => {
    const keyCode = e.code;
    switch (keyCode) {
      case 'ArrowLeft':
        setPlayerPosition((prev) => ({ ...prev, left: prev.left - 1 }));
        break;
      case 'ArrowDown':
        setPlayerPosition((prev) => ({ ...prev, top: prev.top + 1 }));
        break;
      case 'ArrowRight':
        setPlayerPosition((prev) => ({ ...prev, left: prev.left + 1 }));
        break;
      case 'ArrowUp':
        setPlayerPosition((prev) => ({ ...prev, top: prev.top - 1 }));
        break;
    }
  };

  useEffect(() => {
    playerIconRef.current?.focus();
  }, [isStart]);

  useEffect(() => {
    if (isStart) {
      const intervalId = setInterval(() => {
        const direction = ['top', 'right', 'bottom', 'left'][
          Math.floor(Math.random() * 4)
        ];
        const newDevil: NewDevilType = {
          top:
            direction === 'bottom'
              ? -20
              : direction === 'top'
                ? 120
                : getRandomCoordinate,
          left:
            direction === 'right'
              ? -20
              : direction === 'left'
                ? 120
                : getRandomCoordinate,
          direction,
        };
        // const newDevils = devils.slice(1);
        // const newDevilGoals = devilGoals.slice(1);
        // setDevilGoals([...newDevilGoals, { ...playerPosition }]);
        setDevilGoals((prevGoals) => [...prevGoals, { ...playerPosition }]);
        // setDevils([...newDevils, newDevil]);
        setDevils((prevDevils) => [...prevDevils, newDevil]);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isStart, playerPosition]);

  if (!isStart) {
    return (
      <BeforeStartWrapper>
        <GameStartBtn onClick={() => setIsStart(true)}>시작하기</GameStartBtn>
      </BeforeStartWrapper>
    );
  }

  return (
    <MainWrapper>
      <StopWatch isStart={isStart} />
      <PlayerIcon // keydown 이벤트를 위해 포커싱을 해줘야함.
        ref={playerIconRef}
        tabIndex={0} // 처음 들어갔을 때 포커싱을 위한 탭 인덱스
        onKeyDown={movePlayerHandler}
        playerPosition={playerPosition}
        src={playerIcon}
        alt="player"
      />
      {devils.map((devil, idx) => (
        <Devil key={idx} playerPosition={devilGoals[idx]} {...devil} />
      ))}
    </MainWrapper>
  );
}

const BeforeStartWrapper = styled.main`
  background-color: #faeece;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameStartBtn = styled.button`
  padding: 10px 15px;
  font-size: large;
  border-radius: 10px;
  background-color: #ff000092;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #ff00005c;
  }
`;

const MainWrapper = styled.main`
  background-color: #faeece;
  width: 100vw;
  height: 100vh;
`;

const PlayerIcon = styled.img<PlayerIconType>`
  position: absolute;
  top: ${(props) => props.playerPosition.top}%;
  left: ${(props) => props.playerPosition.left}%;
  transform: translateX(-50%);
  outline: none;
`;

interface NewDevilType {
  top: number;
  left: number;
  direction: string;
}

interface PlayerIconType {
  playerPosition: {
    top: number;
    left: number;
  };
}

interface DevilGoalsType {
  top: number;
  left: number;
}
