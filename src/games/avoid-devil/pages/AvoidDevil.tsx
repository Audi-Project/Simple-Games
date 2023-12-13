import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import playerIcon from '../../../assets/avoid-devil/player-icon.svg';
import Devil from '../components/Devil';

const getRandomCoordinate = Math.floor(Math.random() * 100);

export default function AvoidDevil() {
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
  }, []);

  useEffect(() => {
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
      setDevilGoals((prevGoals) => [...prevGoals, { ...playerPosition }]);
      setDevils((prevDevils) => [...prevDevils, newDevil]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playerPosition]);

  return (
    <MainWrapper>
      <PlayerIcon // keydown 이벤트를 위해 포커싱을 해줘야함.
        ref={playerIconRef}
        tabIndex={0}
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
