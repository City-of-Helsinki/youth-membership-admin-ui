import { password, testUrl, usernameNoAccess } from './util/settings';
import { login } from './util/login';
import { loginSelector } from './pages/loginSelector';

fixture('Open login page and test login').page(testUrl());

test('No access', async (t) => {
  await t
    .click(loginSelector.loginButton)
    .click(loginSelector.helLoginLink)
    .typeText(loginSelector.helUsername, usernameNoAccess())
    .typeText(loginSelector.helPassword, password())
    .click(loginSelector.helLogin)
    .expect(loginSelector.noAccess.innerText)
    .eql('Sinulla ei ole oikeuksia käyttää tätä järjestelmää.');
});

test('With access rights', async (t) => {
  await login(t);
});
