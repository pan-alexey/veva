import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Svg from './svg/logo.svg';
import WebpackImg from './assets/webpack.png'

import './index.scss'

// let a: string = 1;
function App() {
  const Text = React.lazy(() => import("./components/Text"));

  return (
    <div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div id='title'>
        <span>
          VEVA BOILERPLATE
        </span>
        <br />
        <Suspense fallback={null}>
          <Text />
        </Suspense>
      </div>

      {/* <img src={WebpackImg} classNameName="App-logo" alt="logo" /> */}
      {/* <span dangerouslySetInnerHTML={{__html: Svg}} /> */}
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
