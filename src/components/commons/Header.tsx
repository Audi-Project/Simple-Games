import styled from '@emotion/styled';
import Hamburger from '../../assets/icons/Hamburger';
import LogoIcon from '../../assets/icons/LogoIcon';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 80px;
  margin-top: 20px;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <LogoIcon />
      <Hamburger />
    </HeaderWrapper>
  );
}
