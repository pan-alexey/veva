import React from 'react';
import { render, hydrate } from "react-dom";
import App from './App';

(()=>{
    if (!window.__widgets__) window.__widgets__ = {};

    const widgetName = 'app-1';

    window.__widgets__[widgetName] = {
        hydrate(element, props, state) {
            hydrate(<App {...props}/>, element);
        },
        render(element, props) {
            render(<App {...props}/>, element);
        },
        unmount(element) {
            React.unmountComponentAtNode(element);
        },
    }
})()

