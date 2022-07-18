import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'

// let a: string = 1;
function App() {
  const Text = React.lazy(() => import("./components/Text"));

  return (
    <div id="main">
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
