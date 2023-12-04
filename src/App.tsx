import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import Header from './components/commons/Header';

function App() {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}
          @font-face {
            font-family: 'GmarketSansMedium';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff')
              format('woff');
            font-weight: normal;
            font-style: normal;
            color: '#233868';
          }

          *,
          *::after,
          *::before {
            font-family: 'GmarketSansMedium';
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
      <Header />
      <main>Home</main>
    </>
  );
}

export default App;
