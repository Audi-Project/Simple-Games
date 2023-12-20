import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import devilIcon from '../../../assets/avoid-devil/Vector.svg';

export default function Devil({ top, left, playerPosition }: DevilPropsType) {
  return (
    <>
      {typeof top === 'number' && typeof left === 'number' ? (
        <DevilElement
          top={top}
          left={left}
          // direction={direction}
          playerPosition={playerPosition}
          src={devilIcon}
          alt="악마"
        />
      ) : (
        ''
      )}
    </>
  );
}

const DevilElement = styled.img<DevilElementProps>`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: ${(props) =>
      moveAnimation(props.top, props.left, props.playerPosition)}
    4s linear infinite;
`;

const moveAnimation = (
  top: number,
  left: number,
  playerPosition: {
    top: number;
    left: number;
  },
) => keyframes`
  0% {
    top: top;
    left: left;
  }

  50% {
    top: ${playerPosition.top}%;
    left: ${playerPosition.left}%;
  }

  100% {
    top: ${2 * playerPosition.left - left}%;
    left: ${2 * playerPosition.top - top}%;
  }
`;

interface DevilPropsType {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  playerPosition: {
    top: number;
    left: number;
  };
}

interface DevilElementProps {
  top: number;
  left: number;
  playerPosition: {
    top: number;
    left: number;
  };
}
