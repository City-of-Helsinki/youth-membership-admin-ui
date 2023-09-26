import { Selector } from 'testcafe';
import { apiUsername, apiPassword } from '../util/settings';

const loginPage = {
  loginButton: Selector('input[type="submit"][value="Kirjaudu sisään"]'),
  username: Selector('#id_username'),
  password: Selector('#id_password'),
};

export const login = async (t: TestController) => {
  const username = apiUsername(), password = apiPassword();

  await t
    .click(loginPage.loginButton)

  await t
    .typeText(loginPage.username, username)
    .typeText(loginPage.password, password)
    .click(loginPage.loginButton);

  // Wait for authorization to finish
  await t.wait(1000); // 1s
};
