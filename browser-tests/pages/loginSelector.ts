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
  permissionPage: Selector('h2').withText(/Permission request|Lupapyyntö/i),
  givePermissionButton: Selector('input[type="submit"][value="Anna lupa"]'),
};
