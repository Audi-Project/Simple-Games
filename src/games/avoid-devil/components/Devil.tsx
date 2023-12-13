import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import devilIcon from '../../../assets/avoid-devil/Vector.svg';

export default function Devil({
  top,
  left,
  direction,
  playerPosition,
}: DevilPropsType) {
  return (
    <DevilElement
      top={top}
      left={left}
      direction={direction}
      playerPosition={playerPosition}
      src={devilIcon}
      alt="악마"
    />
  );
}

const DevilElement = styled.img<DevilElementProps>`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: ${(props) => moveAnimation(props.direction, props.playerPosition)}
    4s linear infinite;
`;

const moveAnimation = (
  direction: string,
  playerPosition: { top: number; left: number },
) => keyframes`
  from {
    ${direction === 'top' ? 'top: 100%;' : ''}
    ${direction === 'right' ? 'left: -20%;' : ''}
    ${direction === 'bottom' ? 'top: -20%;' : ''}
    ${direction === 'left' ? 'left: 100%;' : ''}
  }

  to {
    top: ${playerPosition.top}%;
    left: ${playerPosition.left}%;
  }
`;

interface DevilPropsType {
  top: number;
  left: number;
  direction: string;
  playerPosition: {
    top: number;
    left: number;
  };
}

interface DevilElementProps {
  top: number;
  left: number;
  direction: string;
  playerPosition: {
    top: number;
    left: number;
  };
}