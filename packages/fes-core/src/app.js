import './polyfill';
// eslint-disable-next-line
import '@webank/fes-ui/dist/styles/fes-ui.css';
import './views/styles/index.scss';
// eslint-disable-next-line
import init from 'projectRoot/src/app.js';
import App from './instance/app';

App.init(init);
