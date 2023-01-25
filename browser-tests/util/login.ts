import { loginSelector } from '../pages/loginSelector';
import { navigationSelector } from '../pages/navigationSelector';
import { username, password } from './settings';

export const login = async (t: TestController) => {
  await t
    .click(loginSelector.loginButton)
    .click(loginSelector.helLoginLink)
    .typeText(loginSelector.helUsername, username())
    .typeText(loginSelector.helPassword, password())
    .click(loginSelector.helLogin);

  await t.wait(1000);

  await t.expect(navigationSelector.sideNavigation.exists).ok();
};
