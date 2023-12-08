import styled from '@emotion/styled';
import Beige from './assets/icons/ramis/Beige';
import DeepBlue from './assets/icons/ramis/DeepBlue';
import SkyBlue from './assets/icons/ramis/SkyBlue';
import Yellow from './assets/icons/ramis/Yellow';
import Header from './components/commons/Header';
import OverlayProvider from './contexts/OverlayProvider';

const Main = styled.main`
  width: 100%;
  height: calc(100% - 120px);
  padding: 0px 80px;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  gap: 36px;
  margin-bottom: 200px;
`;

function App() {
  return (
    <OverlayProvider>
      <Header />
      <Main>
        <MainContent>
          <DeepBlue />
          <SkyBlue />
          <Yellow />
          <Beige />
        </MainContent>
      </Main>
    </OverlayProvider>
  );
}

export default App;
