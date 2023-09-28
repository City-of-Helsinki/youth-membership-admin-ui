import { testUrl } from './util/settings';
import { login } from './util/login';
import { openCityProfileServiceClientId, openCityProfileTunnistamoUserAccesses } from './opencityprofile/services';
import { tunnistamoUserAccesses } from './api/userTunnistamo';

fixture('Ensure open city profile client id and admin user access')
  .page(testUrl())
  .beforeEach(async (t) => {
    await login(t);
  });

test('Ensure open city profile client id', async (t) => {
  await openCityProfileServiceClientId(t);
});


test('Ensure tunnistamo user has accesses', async (t) => {
  await openCityProfileTunnistamoUserAccesses(t);
  await tunnistamoUserAccesses(t);
});
