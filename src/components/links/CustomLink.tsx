import React from 'react';
import useActiveRoute from '../../custom-hooks/useActiveRoute';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import { Link } from 'react-router-dom';
import { LinkType } from '../../types';
import useToggleBoolean from '../../custom-hooks/useToggleBoolean';
import { useAppSelector } from '../../custom-hooks/useRedux';
interface CustomLinkProps {
  route: LinkType;
}

const CustomLink: React.FC<CustomLinkProps> = ({ route }) => {
  const isOpen = useAppSelector((state) => state.sidebar.value);
  const { value: isExpanded, handleToggle } = useToggleBoolean();
  const { t } = useLocalTranslation();
  const isActive = useActiveRoute(route.path);
  const translatedTitle = t(route.title);

  const hasChildren =
    Array.isArray(route.children) && route.children.length > 0;

  const linkClassNames = [
    'inline-flex',
    'items-center',
    'justify-between',
    'h-12',
    'transition-all',
    isOpen
      ? 'lg:ps-custom-default md:ps-custom-md ps-custom-sm md:pe-4'
      : 'ps-4',
    isActive && !hasChildren
      ? 'bg-neutral active-link text-primary'
      : 'text-gray',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <Link
        className={linkClassNames}
        to={route.path}
        onClick={handleToggle}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-controls={hasChildren ? `submenu-${route.path}` : undefined}
        role={hasChildren ? 'button' : undefined}
      >
        <div className="flex items-center">
          <div className="w-8">
            {route.icon && (
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: route.icon }}
              />
            )}
          </div>
          <span
            className={`${isOpen ? 'md:block hidden' : 'hidden'} font-md text-[15px]`}
          >
            {translatedTitle}
          </span>
        </div>
        {hasChildren && (
          <img
            className={`transition-all duration-200 ${isExpanded ? 'rotate-180' : ''} ${isOpen ? 'md:block hidden' : 'hidden'}`}
            src="/icons/arrow.svg"
            alt={isExpanded ? 'Collapse' : 'Expand'}
          />
        )}
      </Link>
      {hasChildren && (
        <div
          id={`submenu-${route.path}`}
          className={`wrapper ${isExpanded ? 'is-open' : ''}`}
        >
          <div className="flex flex-col overflow-hidden">
            {route.children?.map((child, index) => (
              <CustomLink key={`${child.path}-${index}`} route={child} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomLink;
