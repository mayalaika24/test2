import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return handleNavigate;
};

export default useNavigation;
