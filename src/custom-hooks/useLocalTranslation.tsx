import { useTranslation } from 'react-i18next';

function useLocalTranslation() {
  const { t, i18n, ready } = useTranslation();
  return {
    t,
    i18n,
    ready,
    changeLanguage: i18n.changeLanguage,
    currentLanguage: i18n.language,
  };
}

export default useLocalTranslation;
