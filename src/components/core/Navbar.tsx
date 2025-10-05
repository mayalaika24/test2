import { useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import languagesData from '../../data/languages.json';
import { Language, LanguageCode } from '../../types';
import { useAuth } from '../../contexts/useAuth';
import { cn } from '../../lib/utils';
import useNavigation from '../../custom-hooks/useNavigation';

const FLAG_IMAGES: Record<LanguageCode, string> = {
  en: '/icons/us.svg',
  ar: '/icons/sy.svg'
};
const imageIconClass = 'h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full';
const Navbar = () => {
  const { logout, isLoggingOut, user } = useAuth();
  const { t, currentLanguage, changeLanguage } = useLocalTranslation();
  const buttons = useMemo(() => {
    return [
      {
        title: 'logout',
        className: 'text-sm mt-2',
        disable: isLoggingOut,
        command: () => handleLogout(),
      },
    ];
  }, [isLoggingOut]);
  const navigate = useNavigation();
  const availableLanguages = useMemo(
    () =>
      languagesData.filter(
        (language) => language.code !== currentLanguage
      ) as Language[],
    [currentLanguage]
  );

  const currentFlagImage = useMemo(
    () => FLAG_IMAGES[currentLanguage as LanguageCode] || FLAG_IMAGES.en,
    [currentLanguage]
  );

  const handleLogout = async () => {
    try {
      const isLoggedOut = await logout();
      if (isLoggedOut) {
        navigate('/auth');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 md:h-20 w-full items-center border-b border-gray-200 bg-white lg:px-custom-default md:px-custom-md px-custom-sm">
      <div className="flex items-center gap-4 md:w-side">
        Logo will goes here
      </div>

      <div className="flex flex-1 items-center justify-between gap-2 md:gap-4">
        <div></div>
        <div className="flex items-center gap-2 md:gap-3 lg:gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger aria-label={t('change_language')}>
              <img
                className={`${imageIconClass} object-cover`}
                src={currentFlagImage}
                alt={t('current_language_flag')}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{t('select_language')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableLanguages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onSelect={() => changeLanguage(language.code)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={FLAG_IMAGES[language.code] || FLAG_IMAGES.en}
                      alt={t(`${language.code}_flag`)}
                      className="h-4 w-6 object-contain"
                    />
                    <span>{t(language.title)}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger className="flex items-center gap-1 md:gap-3">
              <img
                className={imageIconClass}
                src={`${user?.image || `https://ui-avatars.com/api/?name=${user?.firstName + ' ' + user?.lastName}&background=F1F5F9&color=1F3A8A`}`}
                alt={t('user_avatar')}
              />
              <div className="hidden lg:flex flex-col items-start text-base text-black">
                <span>{`${user?.firstName} ${user?.lastName}`}</span>
              </div>
              <img
                src="/icons/arrow.svg"
                alt={t('arrow')}
                className="hidden lg:block"
              />
            </PopoverTrigger>
            <PopoverContent className="max-w-[200px]">
              <div className="flex flex-col items-start">
                {buttons.map((item, i) => {
                  return (
                    <button
                      disabled={item.disable}
                      key={i}
                      className={cn(
                        item.className,
                        'hover:bg-alice-blue w-full px-4 py-2 rounded-md'
                      )}
                      onClick={item.command}
                    >
                      {t(item.title)}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
