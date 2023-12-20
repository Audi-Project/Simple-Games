import { GAME_ANSWER } from '../type/RockPaperScissorsAnswer';

const RANDOM = {
  max: 3,
  min: 1,
};

const makeRandomAnswer: () => GAME_ANSWER = () => {
  const { max, min } = RANDOM;
  return Math.floor(Math.random() * (max - min) + min) as GAME_ANSWER;
};

export default makeRandomAnswer;
