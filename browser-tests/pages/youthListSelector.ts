import { Selector } from 'testcafe';

import { userLastName } from '../util/settings';

export const youthListSelector = {
  firstName: Selector('input[id="firstName"]'),
  lastName: Selector('input[id="lastName"]'),
  searchButton: Selector('button[class^="YouthList_search"]'),
  addNewButton: Selector('button[class^="YouthList_create"]'),
  dataGrid: Selector('div[class^="YouthList_dataGrid"]'),
  selectTestProfile: Selector('td').withText(userLastName()),
};
