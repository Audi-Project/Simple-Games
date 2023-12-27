import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
interface Props {
  open: boolean;
  onClose: () => void;
}

const MenuModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const GameLinkWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 24px;

  & > a {
    text-decoration: none;
    color: white;
    font-size: 48px;
    text-align: center;
    transition: all 0.3s;
  }

  &:hover > a:active {
    transform: scale(0.9);
  }

  &:hover > a:not(:hover) {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);

    & > a {
      font-size: 38px;
    }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 40px;
  right: 73px;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  & > svg {
    width: 50px;
    height: 50px;
    color: #fff;
  }
`;

export default function MenuModal({ open, onClose }: Props) {
  return (
    open && (
      <MenuModalWrapper>
        <GameLinkWrapper>
          <Link to="/games/left-right">왼쪽과 오른쪽</Link>
          <Link to="/games/1to50">일 부터 오십</Link>
          <Link to="/games/rock-paper-scissors">가위바위보</Link>
          <Link to="/games/avoid-devil">악마 피하기</Link>
        </GameLinkWrapper>
        <CloseBtn onClick={onClose}>
          <IoCloseOutline />
        </CloseBtn>
      </MenuModalWrapper>
    )
  );
}
