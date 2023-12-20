import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RockScissorsPaperImg from '../components/RockScissorsPaper/RockScissorsPaperImg';
import * as SC from '../styles/RockPaperScissorsStyle';
import { GAME_ANSWER } from '../type/RockPaperScissorsAnswer';
import makeRandomAnswer from '../utils/makeRandomAnswer';

export default function RockPaperScissors() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState<number>(40000);
  const [hp, setHp] = useState<number>(100);
  const [answer, setAnswer] = useState<GAME_ANSWER>(() => makeRandomAnswer());
  const [userAnswer, setUserAnswer] = useState<GAME_ANSWER>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    let timeFlow: number;
    if (timer > 0) {
      timeFlow = setTimeout(() => setTimer((prev) => prev - 10), 10);
    }
    return () => clearTimeout(timeFlow);
  }, [timer]);

  useEffect(() => {
    const showResult = setTimeout(() => {
      setAnswer(() => makeRandomAnswer());
      setIsClicked(false);
    }, 2000);

    return () => clearTimeout(showResult);
  }, [isClicked, answer, userAnswer]);

  const compareAnswer = (userAnswer: GAME_ANSWER) => {
    setUserAnswer(userAnswer);
    setIsClicked(true);
    if (answer === 0 && userAnswer === 2) setHp((prev) => prev - 10);
    else if (answer === 1 && userAnswer === 0) setHp((prev) => prev - 10);
    else if (answer === 2 && userAnswer === 1) setHp((prev) => prev - 10);
  };

  const replayGame = () => {
    setTimer(40000);
    setHp(100);
    setAnswer(() => makeRandomAnswer());
    setIsClicked(false);
  };

  return (
    <SC.Background>
      {(timer === 0 || hp === 0) && (
        <SC.QuitOrReplayContainer>
          <SC.Total>총 점수</SC.Total>
          <SC.Total>{100 - hp}점</SC.Total>
          <SC.BtnWrap>
            <SC.ReplayBtn onClick={replayGame}>다시하기</SC.ReplayBtn>
            <SC.ReturnBtn onClick={() => navigate('/')}>돌아가기</SC.ReturnBtn>
          </SC.BtnWrap>
        </SC.QuitOrReplayContainer>
      )}

      <SC.Timer>
        <SC.FullTime />
        <SC.CurTime time={timer} />
      </SC.Timer>

      {isClicked && (
        <SC.AnswerBox>
          <SC.AnswerWrap>
            <SC.Name>악마</SC.Name>
            <RockScissorsPaperImg input={answer} />
          </SC.AnswerWrap>
          <SC.VersusLine />
          <SC.AnswerWrap>
            <SC.Name>유저</SC.Name>
            <RockScissorsPaperImg input={userAnswer} />
          </SC.AnswerWrap>
        </SC.AnswerBox>
      )}

      {!isClicked && (
        <>
          <SC.DevilContainer>
            <SC.SmallDevil src="/rockpaperscissors/devil-friend.svg" />
            <SC.LittleDevil src="/rockpaperscissors/devil-friend.svg" />
            <SC.Devil src="/rockpaperscissors/devil.svg" />
          </SC.DevilContainer>
          <SC.Hp>HP {hp}</SC.Hp>

          <SC.BtnContainer>
            <SC.BtnBox>
              <SC.Btn onClick={() => compareAnswer(0)}>
                <SC.BtnImg src="/rockpaperscissors/rock.svg" />
              </SC.Btn>
              <SC.BtnName>바위</SC.BtnName>
            </SC.BtnBox>

            <SC.BtnBox>
              <SC.Btn onClick={() => compareAnswer(1)}>
                <SC.BtnImg src="/rockpaperscissors/scissor.svg" />
              </SC.Btn>
              <SC.BtnName>가위</SC.BtnName>
            </SC.BtnBox>
            <SC.BtnBox>
              <SC.Btn onClick={() => compareAnswer(2)}>
                <SC.BtnImg src="/rockpaperscissors/paper.svg" />
              </SC.Btn>
              <SC.BtnName>보</SC.BtnName>
            </SC.BtnBox>
          </SC.BtnContainer>
        </>
      )}
    </SC.Background>
  );
}
