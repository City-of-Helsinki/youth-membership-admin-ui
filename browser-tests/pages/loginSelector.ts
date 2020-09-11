import { Selector } from 'testcafe';

export const loginSelector = {
  loginButton: Selector('button[type="button"]'),
  helLoginLink: Selector('.login-method-helusername'),
  helUsername: Selector('#username'),
  helPassword: Selector('#password'),
  helLogin: Selector('#kc-login'),
  noAccess: Selector('p[class^="makeStyles-description"]'),
};
