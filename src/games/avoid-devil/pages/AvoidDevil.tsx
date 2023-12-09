import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
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
    }, 1000); // Adjust the interval as needed

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MainWrapper>
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
