import { testUrl } from './util/settings';
import { openCityProfileServiceClientId } from './opencityprofile/services';

fixture('Ensure open city profile client id').page(testUrl());

test('Ensure open city profile client id', async (t) => {
  await openCityProfileServiceClientId(t);
});
