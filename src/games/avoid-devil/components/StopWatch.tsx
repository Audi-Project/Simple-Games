import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function StopWatch({ isStart }: { isStart: boolean }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number;

    if (isStart) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isStart]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millis = milliseconds % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}:${String(millis).padStart(2, '0')}`;
  };

  return (
    <StopWatchWrapper>
      <p>{formatTime(time)}</p>
    </StopWatchWrapper>
  );
}

const StopWatchWrapper = styled.section`
  padding: 30px;
  font-size: x-large;
  font-weight: bold;
`;
