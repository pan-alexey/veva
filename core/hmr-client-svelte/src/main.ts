import App from "./App.svelte";

const target = document.createElement('div');
target.setAttribute('id', "__webpack_hmr_server__"); 
document.body.parentNode.appendChild(target);
const app = new App({
  target,
});
export default app;
