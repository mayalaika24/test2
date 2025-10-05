import React from 'react';
export interface DialogDataType {
  header: string;
  children?: React.ReactNode;
  onClose: VoidFunction;
  trigger?: number;
  loading?: boolean;
}
export interface DialogLayoutType
  extends Pick<DialogDataType, 'header' | 'children' | 'trigger'> {
  footer?: React.ReactNode;
}
export interface ChildrenType {
  children: React.ReactNode;
}
export interface Link {
  path: string;
  title: string;
}

export interface ApiResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface LinkType extends Link {
  icon?: string;
  children?: Array<Link>;
}

export type LanguageCode = 'en' | 'ar';

export interface Language {
  icon: string;
  title: string;
  code: LanguageCode;
}

export interface ClassNameType {
  className?: string;
}

export type Action = 'view' | 'update' | 'delete' | 'create';

export interface ActionsProps {
  actions: Action[];
  onAction: VoidFun<Action>;
}

export type VoidFun<T = any> = (val: T) => void;

export interface ActionButtonProps {
  action: Action;
  onAction: VoidFun<Action>;
}

export interface Temp<T = any> {
  action: Action;
  data: T;
}
