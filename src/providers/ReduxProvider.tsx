import { Provider } from 'react-redux';
import store from '../store';
import React from 'react';
import { ChildrenType } from '../types';
const ReduxProvider: React.FC<ChildrenType> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
