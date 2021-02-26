/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { render, hydrate } from 'react-dom';
import App from '@src/app';

(() => {
  // @ts-ignore
  if (!window.__widgets__) window.__widgets__ = {};

  const widgetName = 'app-1';

  // @ts-ignore
  window.__widgets__[widgetName] = {
    // @ts-ignore
    hydrate(element, props) {
      hydrate(<App {...props} />, element);
    },
    // @ts-ignore
    render(element, props) {
      render(<App {...props} />, element);
    },
    // @ts-ignore
    unmount(element) {
      // @ts-ignore
      React.unmountComponentAtNode(element);
    }
  };
})();
