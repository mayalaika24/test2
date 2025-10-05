import React from 'react';
const Login = React.lazy(() => import('../views/auth/login/Login'));
export default {
  path: '/auth',
  element: <Login />,
};
