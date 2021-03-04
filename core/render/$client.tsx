import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from '@src/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// (() => {
//   // @ts-ignore
//   if (!window.__widgets__) window.__widgets__ = {};

//   const widgetName = 'app-1';

//   // @ts-ignore
//   window.__widgets__[widgetName] = {
//     // @ts-ignore
//     hydrate(element, props) {
//       hydrate(<App {...props} />, element);
//     },
//     // @ts-ignore
//     render(element, props) {
//       render(<App {...props} />, element);
//     },
//     // @ts-ignore
//     unmount(element) {
//       // @ts-ignore
//       React.unmountComponentAtNode(element);
//     }
//   };
// })();
