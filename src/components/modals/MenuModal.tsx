import styled from '@emotion/styled';
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
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 48px;
  right: 48px;
`;

export default function MenuModal({ open, onClose }: Props) {
  return (
    open && (
      <MenuModalWrapper>
        <GameLinkWrapper>
          <Link to="/left-right">왼쪽과 오른쪽</Link>
          <Link to="#">일 부터 오십</Link>
          <Link to="#">끝말잇기</Link>
          <Link to="#">가위바위보</Link>
          <Link to="/left-right">왼쪽과 오른쪽</Link>
          <Link to="#">일 부터 오십</Link>
          <Link to="#">끝말잇기</Link>
          <Link to="#">가위바위보</Link>
          <Link to="/left-right">왼쪽과 오른쪽</Link>
          <Link to="#">일 부터 오십</Link>
          <Link to="#">끝말잇기</Link>
          <Link to="#">가위바위보</Link>
          <Link to="/left-right">왼쪽과 오른쪽</Link>
          <Link to="#">일 부터 오십</Link>
          <Link to="#">끝말잇기</Link>
          <Link to="#">가위바위보</Link>
        </GameLinkWrapper>
        <CloseBtn onClick={onClose}>닫기</CloseBtn>
      </MenuModalWrapper>
    )
  );
}
