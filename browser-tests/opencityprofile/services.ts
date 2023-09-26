import { Selector } from 'testcafe';
import { openCityProfileURL, openCityProfileClientId, username } from '../util/settings';
import { login as openCityProfileLogin } from './login';

const routeLogin = () => `${openCityProfileURL()}/admin/login/`;
const routeServices = () => `${openCityProfileURL()}/admin/services/service/`;
const routeUser = () => `${openCityProfileURL()}/admin/users/user/`;

const youthService = {
    youthServiceLink: Selector('a').withText('Nuorisopalveluiden jäsenkortti'),
    addClientIdLink: Selector('a').withText('Lisää toinen Client id'),
    newClientIdInput: Selector('.last-related').find('input'),
    saveButton:  Selector('input[type="submit"][name="_save"]'),
};

const user = {
    selectByEmail: Selector('.field-email').withText(`${username()}`).sibling('.field-uuid').child('a'),
    // user change
    staffStatusCheckbox: Selector('#id_is_staff'),
    superUserStatusCheckbox: Selector('#id_is_superuser'),
    chooseAllPermissions: Selector('#id_user_permissions_add_all_link'),
  
    saveButton: Selector('input[type="submit"][value="Tallenna ja poistu"]'),
  };
  
// try to find client_id from input fields. Some reason Selector cannot find it directly

const clientIdExists = async (t: TestController, clientid: string) => {
    let found = false;

    let clientIdsCount= await (Selector('.field-client_id').count);

    // id numbers start from 0, count includes one hidden element, it should decrease from count
    for (let i = 0; i < clientIdsCount-1; i++) {
        let id=`#id_client_ids-${i}-client_id`; 
        let input_client_id = await Selector(id).value;

        if (input_client_id == clientid) {
            console.log("Client id found!");
            found = true;
        }
    }

    return found;
};

export const openCityProfileServiceClientId = async (t: TestController) => {
    // api url has to be configured
    if (!openCityProfileURL()) {
      return;
    }

    await t.navigateTo(routeLogin());

    await openCityProfileLogin(t);
  
    await t.navigateTo(routeServices());

    await t.click(youthService.youthServiceLink);

    if (! await clientIdExists(t, openCityProfileClientId())) {
        console.info(`Add new clientid '${openCityProfileClientId()}'`)

        await t
            .click(youthService.addClientIdLink)
            .typeText(youthService.newClientIdInput, openCityProfileClientId())
            .click(youthService.saveButton);
    }
};

export const openCityProfileTunnistamoUserAccesses = async (t: TestController) => {
    // api url has to be configured
    if (!openCityProfileURL()) {
      return;
    }
  
    await t.navigateTo(routeLogin());
  
    await openCityProfileLogin(t);
  
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
  