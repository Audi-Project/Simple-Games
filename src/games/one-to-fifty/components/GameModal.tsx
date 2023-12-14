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

const CurrentTime = styled.h3`
  font-size: 50px;
  font-weight: bold;
  color: #fff;

  span {
    color: ${Variables.colors.deepYellow};
  }
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

const BlueButton = styled.button`
  background-color: ${Variables.colors.lightBlue};
`;

const YellowButton = styled.button`
  background-color: ${Variables.colors.deepYellow};
`;

interface GameModalPropsT {
  timeText: string;
  currentNumber: number;
}

const GameModal = ({ timeText, currentNumber }: GameModalPropsT) => {
  return (
    <ModalWrapper>
      <DropBox />
      <ScoreWrapper>
        <CurrentTime>
          <span>{timeText ? timeText : '0'}</span>초 만에 달성!
        </CurrentTime>
        <ScoreCircle>
          <CurrentScore>{currentNumber - 1}</CurrentScore>
          <LastNumber>/50</LastNumber>
        </ScoreCircle>
      </ScoreWrapper>

      <ButtonWrapper>
        <BlueButton>다시하기</BlueButton>
        <YellowButton>나가기</YellowButton>
      </ButtonWrapper>
    </ModalWrapper>
  );
};

export default GameModal;
