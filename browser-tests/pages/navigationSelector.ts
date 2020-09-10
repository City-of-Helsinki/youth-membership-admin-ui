import { Selector } from 'testcafe';

export const navigationSelector = {
  sideNavigation: Selector('div[class^="MuiDrawer-root"]'),
  youthProfiles: Selector('a[href="/youthProfiles"]'),
};
