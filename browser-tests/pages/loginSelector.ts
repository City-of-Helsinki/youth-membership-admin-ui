import { Selector } from 'testcafe';

export const loginSelector = {
  loginButton: Selector('button[type="button"]'),
  helLoginLink: Selector('.btn-helusername'),
  helUsername: Selector('#username'),
  helPassword: Selector('#password'),
  helLogin: Selector('#kc-login'),
  noAccess: Selector('p').withText(
    'Sinulla ei ole oikeuksia käyttää tätä järjestelmää'
  ),
};
