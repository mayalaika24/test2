import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import ReduxProvider from './providers/ReduxProvider';
import { AuthProvider } from './contexts/useAuth';
import Router from './routes';
import './locals/index';
import useLocalTranslation from './custom-hooks/useLocalTranslation.tsx';
import { useEffect } from 'react';
function App() {
  function setDir(lang: string) {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }
  const { currentLanguage } = useLocalTranslation();
  useEffect(() => {
    setDir(currentLanguage);
  }, [currentLanguage]);
  return (
    <div className="bg-light-blue">
      <Toaster />
      <ReduxProvider>
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
