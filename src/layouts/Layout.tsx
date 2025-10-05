import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Sidebar';
import Navbar from '../components/core/Navbar';
import { useAuth } from '../contexts/useAuth';
import { useEffect, useState } from 'react';
import Loader from '../components/ui/Loader';
const Layout = () => {
  const { checkAuth, isAuthenticated, user } = useAuth();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const initialize = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      initialize();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Navbar />
      <div className="h-[calc(100%-64px)] flex">
        <Sidebar />
        <div className="flex-1 px-normal h-full overflow-y-auto lg:px-custom-default md:px-custom-md px-custom-sm py-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
