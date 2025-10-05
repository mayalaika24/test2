import { useLocation } from 'react-router-dom';
const useActiveRoute = (path: string = '') => {
  const location = useLocation();
  const isActive = location.pathname === path;
  return isActive;
};

export default useActiveRoute;
