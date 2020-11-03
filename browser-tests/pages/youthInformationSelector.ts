import { Selector } from 'testcafe';

export const youthInformationSelector = {
  basicInformationTitle: Selector('h3').withText('Perustiedot'),
  backToSearchResults: Selector('button').withText('Takaisin hakutulokseen'),
  editProfile: Selector('button').withText('Muokkaa'),
  name: Selector('p').withText('Nimi').sibling('p'),
  mainAddress: Selector('p').withText('Osoite').sibling('p').nth(0),
  secondaryAddress: Selector('p').withText('Osoite').sibling('p').nth(1),
  phone: Selector('p').withText('Puhelinnumero').sibling('p'),
  languageAtHome: Selector('p').withText('Kotona puhuttu kieli').sibling('p'),
  photoUsage: Selector('p').withText('Kuvauslupa').sibling('p'),
  mainApproverName: Selector('p').withText('Nimi').sibling('p').nth(1),
  mainApproverEmail: Selector('p').withText('Sähköposti').sibling('p').nth(1),
  mainApproverPhone: Selector('p')
    .withText('Puhelinnumero')
    .sibling('p')
    .nth(1),
  secondaryApproverName: Selector('p').withText('Nimi').sibling('p').nth(2),
  secondaryApproverEmail: Selector('p')
    .withText('Sähköposti')
    .sibling('p')
    .nth(2),
  secondaryApproverPhone: Selector('p')
    .withText('Puhelinnumero')
    .sibling('p')
    .nth(2),
};
