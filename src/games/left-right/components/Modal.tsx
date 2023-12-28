import styled from '@emotion/styled';

type Props = {
  score: number;
  onClose: () => void;
};
const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  gap: 16px;
`;

export default function Modal({ score, onClose }: Props) {
  return (
    <ModalWrapper>
      <p>GAME OVER</p>
      <p>{score}</p>
      <button onClick={onClose}>Close</button>
    </ModalWrapper>
  );
}
