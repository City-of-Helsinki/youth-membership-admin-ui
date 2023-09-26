import { Selector } from 'testcafe';
import { apiUrl, username } from '../util/settings';
import { login as apiLogin } from './login';

const user = {
  selectByEmail: Selector('.field-email').withText(`${username()}`).sibling('.field-uuid').child('a'),
  // user change
  staffStatusCheckbox: Selector('#id_is_staff'),
  superUserStatusCheckbox: Selector('#id_is_superuser'),
  chooseAllPermissions: Selector('#id_user_permissions_add_all_link'),

  saveButton: Selector('input[type="submit"][value="Tallenna ja poistu"]'),
};

const routeLogin = () => `${apiUrl()}/admin/`;
const routeUser = () => `${apiUrl()}/admin/users/user/`;

export const tunnistamoUserAccesses = async (t: TestController) => {
  // api url has to be configured
  if (!apiUrl()) {
    return;
  }

  await t.navigateTo(routeLogin());

  await apiLogin(t);

  await t.navigateTo(routeUser());


  await t.click(user.selectByEmail);

  // these needs to be checked
  if (! await user.staffStatusCheckbox.checked) {
    await t.click(user.staffStatusCheckbox)
  }
  if (! await user.superUserStatusCheckbox.checked) {
    await t.click(user.superUserStatusCheckbox)
  }

  await t
    .click(user.chooseAllPermissions)
    .click(user.saveButton);
};
