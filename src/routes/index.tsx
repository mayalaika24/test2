import { useRoutes } from 'react-router-dom';
import authRoutes from './authRoutes';
import protectedRoutes from './protectedRoutes';
export default function () {
  return useRoutes([authRoutes, protectedRoutes]);
}
