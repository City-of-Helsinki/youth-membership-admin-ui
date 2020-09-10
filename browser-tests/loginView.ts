import { password, testURL, usernameNoAccess } from './util/settings';
import { login } from './util/login';
import { loginSelector } from './pages/loginSelectors';

fixture('Open login page and test login').page(testURL());

test('No access', async (t) => {
  await t
    .click(loginSelector.loginButton)
    .click(loginSelector.helLoginLink)
    .typeText(loginSelector.username, usernameNoAccess())
    .typeText(loginSelector.password, password())
    .click(loginSelector.helLoginButton)
    .expect(loginSelector.noAccess.exists)
    .ok();
});

test('With access rights', async (t) => {
  await login(t);
});
