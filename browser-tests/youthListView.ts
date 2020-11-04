import { navigationSelector } from './pages/navigationSelector';
import { login } from './util/login';
import { testUrl, userFirstName, userLastName } from './util/settings';
import { youthListSelector } from './pages/youthListSelector';
import { youthInformationSelector } from './pages/youthInformationSelector';

fixture('Youth list view').page(testUrl());

test('Test search functionality', async (t) => {
  await login(t);

  await t
    .click(navigationSelector.youthProfiles)
    .typeText(youthListSelector.firstName, userFirstName())
    .typeText(youthListSelector.lastName, userLastName())
    .click(youthListSelector.searchButton)
    .expect(youthListSelector.dataGrid.exists)
    .ok()
    .click(youthListSelector.selectTestProfile)
    .expect(youthInformationSelector.basicInformationTitle.exists)
    .ok()
    .click(youthInformationSelector.backToSearchResults)
    .expect(youthListSelector.firstName.value)
    .eql(userFirstName())
    .expect(youthListSelector.lastName.value)
    .eql(userLastName())
    .expect(youthListSelector.dataGrid.exists)
    .ok();
});
