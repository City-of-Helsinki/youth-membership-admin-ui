import { loginSelector } from '../pages/loginSelector';
import { navigationSelector } from '../pages/navigationSelector';
import { username, password } from './settings';

export const givePermission = async (t: TestController) => {
  // If the user is show a permission request page
  if (await loginSelector.permissionPage.exists) {
    // Give permission
    await t.click(loginSelector.givePermissionButton);
  }
};

export const login = async (t: TestController) => {
  await t
    .click(loginSelector.loginButton)
    .click(loginSelector.helLoginLink)
    .typeText(loginSelector.helUsername, username())
    .typeText(loginSelector.helPassword, password())
    .click(loginSelector.helLogin);

  await t.wait(1000);

  await givePermission(t);

  await t.wait(1000);
  // await t.expect(navigationSelector.sideNavigation.exists).ok();
};
