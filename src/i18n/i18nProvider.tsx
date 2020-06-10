import polyglotI18nProvider from 'ra-i18n-polyglot';
import fiMessages from 'ra-language-finnish';
import enMessages from 'ra-language-english';
import svMessages from 'ra-language-swedish';

import fiDomainMessages from './fi.json';
import enDomainMessages from './en.json';
import svDomainMessages from './sv.json';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const allMessages: { [index: string]: any } = {
  fi: { ...fiMessages, ...fiDomainMessages },
  en: { ...enMessages, ...enDomainMessages },
  sv: { ...svMessages, ...svDomainMessages },
};

const i18nProvider = polyglotI18nProvider(
  (locale: string) => allMessages[locale],
  'fi'
);

export default i18nProvider;
