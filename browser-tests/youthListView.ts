import { navigationSelector } from './pages/navigationSelector';
import { login } from './util/login';
import { testUrl } from './util/settings';
import { youthListSelector } from './pages/youthListSelector';

fixture('Youth list view').page(testUrl());

test('Test search funtionality', async (t) => {
  await login(t);

  await t
    .click(navigationSelector.youthProfiles)
    .typeText(youthListSelector.firstName, 'Testi')
    .click(youthListSelector.searchButton)
    .expect(youthListSelector.dataGrid.exists)
    .ok();
});
