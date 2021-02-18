import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import './index.css';
import packageJson from '../package.json';
import configService from './config/configService';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Checks that required configs were provided during build. This makes
// badly configured environments easier to detect.
configService.checkConfigs();

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: configService.getConfig('REACT_APP_SENTRY_DSN'),
    environment: configService.getConfig('REACT_APP_ENVIRONMENT'),
    release: `${packageJson.name}@${packageJson.version}`,
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
