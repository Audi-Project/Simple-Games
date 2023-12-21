import styled from '@emotion/styled';
import { Variables } from '../../../variables/Variables';

const TimerWrapper = styled.p`
  font-size: 6.25rem;
  font-weight: bold;
  color: ${Variables.colors.deepBlue};
`;

const Timer = ({ timeText }: { timeText: string }) => {
  return <TimerWrapper>{timeText ? timeText : '99:0'}</TimerWrapper>;
};

export default Timer;
