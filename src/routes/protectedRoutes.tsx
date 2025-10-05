import React from 'react';
import Layout from '../layouts/Layout.tsx';
const Posts = React.lazy(() => import('../views/control-panel/posts/page.tsx'));
export default {
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Posts />,
    },
  ],
};
