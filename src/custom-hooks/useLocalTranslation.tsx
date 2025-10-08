import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function useLocalTranslation() {
  const { t, i18n, ready } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    if (i18n.language) {
      localStorage.setItem('language', i18n.language);
      document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
    }
  }, [i18n.language]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return {
    t,
    i18n,
    ready,
    changeLanguage,
    currentLanguage: i18n.language,
  };
}

export default useLocalTranslation;
