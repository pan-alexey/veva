import {h, render} from 'preact';
import App from '~/app/app';

const target = document.createElement('div');
target.setAttribute('id', "__webpack_hmr_server__"); 
document.body.parentNode?.appendChild(target);
render(<App/>, target);
