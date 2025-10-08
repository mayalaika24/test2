import { useRef } from 'react';
import routesData from '../../data/routes.json';
import CustomLink from '../links/CustomLink';
import { useAppSelector } from '../../custom-hooks/useRedux';
import Switch from '../buttons/Switch';
import { LinkType } from '../../types';
const typedRoutes = routesData as LinkType[];
const routes = typedRoutes.map((route: LinkType, i) => {
  return <CustomLink key={i} route={route} />;
});
const Sidebar = () => {
  const isOpen = useAppSelector((state) => state.sidebar.value);
  const sidebarEl = useRef<HTMLDivElement>(null);
  return (
    <div className="relative">
      <Switch className="absolute z-20 md:block hidden" />
      <div
        ref={sidebarEl}
        className={`shadow-lg relative h-full md:py-12 py-9 overflow-y-auto overflow-x-hidden bg-white dark:bg-dark-500 flex flex-col justify-between transition-all duration-700 ease-break ${isOpen ? 'md:w-side w-12' : 'w-12'}`}
      >
        <div className="flex flex-col">{routes}</div>
      </div>
    </div>
  );
};
export default Sidebar;
