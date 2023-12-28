import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const MainWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #555252;
  font-size: 2rem;
  font-weight: bold;
`;

const DifficultyLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default function SelectDifficulty() {
  return (
    <MainWrapper>
      <DifficultyLink to="/games/avoid-devil/1">쉬움</DifficultyLink>
      <DifficultyLink to="/games/avoid-devil/2">중간</DifficultyLink>
      <DifficultyLink to="/games/avoid-devil/3">어려움</DifficultyLink>
    </MainWrapper>
  );
}
