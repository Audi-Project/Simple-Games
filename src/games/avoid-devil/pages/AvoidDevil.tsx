import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import playerIcon from '../../../assets/avoid-devil/player-icon.svg';
import Devil from '../components/Devil';

const getRandomCoordinate = Math.floor(Math.random() * 100);

export default function AvoidDevil() {
  const [devils, setDevils] = useState<NewDevilType[]>([]);

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
      setDevils((prevDevils) => [...prevDevils, newDevil]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MainWrapper>
      <img src={playerIcon} alt="player" />
      {devils.map((devil, idx) => (
        <Devil key={idx} {...devil} />
      ))}
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  background-color: #faeece;
  width: 100vw;
  height: 100vh;
`;

interface NewDevilType {
  top: number;
  left: number;
  direction: string;
}
