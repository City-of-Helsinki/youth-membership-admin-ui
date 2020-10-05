import { Selector } from 'testcafe';

export const youthListSelector = {
  firstName: Selector('input[id="firstName"]'),
  searchButton: Selector('button[class^="YouthList_search"]'),
  dataGrid: Selector('div[class^="YouthList_dataGrid"]'),
};
