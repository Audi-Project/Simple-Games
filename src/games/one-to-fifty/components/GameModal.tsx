import styled from '@emotion/styled';
import { Variables } from '../../../variables/Variables';

const ModalWrapper = styled.article`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const DropBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #000;
  opacity: 0.8;
  z-index: -1;
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
  gap: 10px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const GameInfoTxt = styled.h3`
  font-size: 50px;
  font-weight: bold;
  color: #fff;
`;

const CurrentTime = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid #fff;
  padding: 10px 20px 5px;
  border-radius: 50px;
`;

const ScoreCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const CurrentScore = styled.span`
  color: ${Variables.colors.deepYellow};
  font-size: 60px;
  font-weight: bold;
`;

const LastNumber = styled.span`
  color: #fff;
  font-size: 40px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;

  button {
    border: 0;
    cursor: pointer;
    color: #fff;
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s;
  }
  & button:hover {
    opacity: 0.8;
  }
`;

const YellowButton = styled.button`
  background-color: ${Variables.colors.deepYellow};
`;

interface GameModalPropsT {
  timeText: string;
  score: number;
  closeModal: () => void;
  currentTimeNum: number;
}
const GameModal = ({
  timeText,
  score,
  closeModal,
  currentTimeNum,
}: GameModalPropsT) => {
  return (
    <ModalWrapper>
      <DropBox />
      <ScoreWrapper>
        <TextBox>
          <CurrentTime>{timeText && `${timeText}s`}</CurrentTime>
          <GameInfoTxt>
            {currentTimeNum <= 0 ? ' 아쉽게 실패 :(' : ' 성공 :)'}
          </GameInfoTxt>
        </TextBox>
        <ScoreCircle>
          <CurrentScore>{score - 1}</CurrentScore>
          <LastNumber>/50</LastNumber>
        </ScoreCircle>
      </ScoreWrapper>

      <ButtonWrapper>
        <YellowButton onClick={closeModal}>나가기</YellowButton>
      </ButtonWrapper>
    </ModalWrapper>
  );
};

export default GameModal;
