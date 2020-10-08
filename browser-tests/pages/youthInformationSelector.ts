import { Selector } from 'testcafe';

export const youthInformationSelector = {
  basicInformationTitle: Selector('h3').withText('Perustiedot'),
  backToSearchResults: Selector('button').withText('Takaisin hakutulokseen'),
};
