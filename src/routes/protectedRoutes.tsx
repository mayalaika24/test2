import React from 'react';
import Layout from '../layouts/Layout.tsx';
const Books = React.lazy(() => import('../views/control-panel/books/page.tsx'));
const Users = React.lazy(() => import('../views/control-panel/users/page.tsx'));
export default {
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Books />,
    },
    {
      path: '/users',
      element: <Users />,
    },
  ],
};
