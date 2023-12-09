import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import devilIcon from '../../../assets/avoid-devil/Vector.svg';

export default function Devil({ top, left, direction }: DevilPropsType) {
  return (
    <DevilElement
      top={top}
      left={left}
      direction={direction}
      src={devilIcon}
      alt="악마"
    />
  );
}

const DevilElement = styled.img<DevilElementProps>`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: ${(props) => moveAnimation(props.direction)} 4s linear infinite;
`;

const moveAnimation = (direction: string) => keyframes`
  from {
    ${direction === 'top' ? 'top: 100%;' : ''}
    ${direction === 'right' ? 'left: -20%;' : ''}
    ${direction === 'bottom' ? 'top: -20%;' : ''}
    ${direction === 'left' ? 'left: 100%;' : ''}
  }

  to {
    top: 50%;
    left: 50%;
  }
`;

interface DevilPropsType {
  top: number;
  left: number;
  direction: string;
}

interface DevilElementProps {
  top: number;
  left: number;
  direction: string;
}
