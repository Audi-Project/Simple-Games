import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Variables } from '../variables/Variables';

export const motion1 = keyframes`
  0% {margin-top: 0px;}
	100% {margin-top: 10px;} 
`;

export const motion2 = keyframes`
  0% {margin-top: 8px;}
  100% {margin-top: 0px;} 
`;

export const vibrate = keyframes`
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
}

`;

export const Background = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Variables.colors.lightYellow};
  row-gap: 20px;
  padding: 0;
  margin: 0;
`;

export const Timer = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 10px;
  position: fixed;
  position: relative;
  border-color: blue;
`;

export const FullTime = styled.hr`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  width: 400px;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  border: none;
`;

export const CurTime = styled(FullTime)<{ time: number }>`
  width: ${(props) => props.time / 100}px;
  background-color: ${Variables.colors.deepYellow};
  z-index: 10;
`;

export const DevilContainer = styled.div`
  margin-top: 60px;
  position: relative;
  padding-left: 70px;
`;

export const Devil = styled.img`
  animation: ${vibrate} 0.3s linear infinite both;
`;

export const SmallDevil = styled.img`
  position: absolute;
  width: 52px;
  top: 10px;
  left: 30px;
  animation: ${motion1} 0.3s linear 0s infinite alternate;
`;

export const LittleDevil = styled(SmallDevil)`
  width: 48px;
  left: 0px;
  top: 80px;
  animation: ${motion2} 0.3s linear 0s infinite alternate;
`;

export const Hp = styled.span`
  font-size: 30px;
  font-weight: 900;
  color: ${Variables.colors.deepBlue};
  text-align: center;
`;

export const BtnContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 12px;
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Btn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  &:hover {
    transform: scale(1.05);
  }
`;

export const BtnImg = styled.img`
  width: 120px;
`;

export const BtnName = styled.span`
  font-size: 20px;
  font-weight: 900;
  color: ${Variables.colors.deepBlue};
  text-align: center;
  margin: auto;
  margin-top: 10px;
`;

export const AnswerBox = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
`;

export const AnswerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AnswerImg = styled.img`
  width: 150px;
`;

export const Name = styled.h2`
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 20px;
`;

export const VersusLine = styled.hr`
  width: 300px;
  border: 1px solid ${Variables.colors.deepYellow};
  border-radius: 50px;
`;

export const QuitOrReplayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(47, 43, 43, 0.82);
  position: fixed;
  z-index: 100;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Total = styled.h2`
  font-size: 60px;
  color: white;
  font-weight: 900;
  margin-bottom: 5px;
`;

export const BtnWrap = styled.div`
  margin-top: 50px;
  display: flex;
  column-gap: 15px;
`;

export const ReplayBtn = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  background-color: ${Variables.colors.lightBlue};
  border: none;
  font-size: 20px;
  color: white;
  font-weight: 900;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  &:hover {
    transform: scale(1.05);
  }
`;

export const ReturnBtn = styled(ReplayBtn)`
  background-color: ${Variables.colors.deepYellow};
`;
