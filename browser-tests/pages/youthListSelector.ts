import { Selector } from 'testcafe';

export const youthListSelector = {
  firstName: Selector('input[id="firstName"]'),
  searchButton: Selector('button[class^="YouthList_search"]'),
  addNewButton: Selector('button[class^="YouthList_create"]'),
  dataGrid: Selector('div[class^="YouthList_dataGrid"]'),
};
