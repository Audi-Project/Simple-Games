import { AnswerImg } from '../../styles/RockPaperScissorsStyle';
import { GAME_ANSWER } from '../../type/RockPaperScissorsAnswer';
interface RockScissorsPaperImgProps {
  input: GAME_ANSWER;
}

export default function RockScissorsPaperImg({
  input,
}: RockScissorsPaperImgProps) {
  switch (input) {
    case 0:
      return <AnswerImg src="/rockpaperscissors/rock.svg" />;
    case 1:
      return <AnswerImg src="/rockpaperscissors/scissor.svg" />;
    default:
      return <AnswerImg src="/rockpaperscissors/paper.svg" />;
  }
}
