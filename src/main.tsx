import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import LeftRightGame from './games/left-right/LeftRightGame.tsx';
import OneToFiftyGame from './games/onetofifty/OneToFiftyGame.tsx';
import GlobalStyles from './styles/GlobalStyles.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found...!</div>,
  },
  {
    path: '/left-right',
    element: <LeftRightGame />,
  },
  {
    path: '/1to50',
    element: <OneToFiftyGame />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
