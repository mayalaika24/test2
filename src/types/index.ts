import React from 'react';
import { IconName } from '../components/ui/icon';
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

export interface ApiResponse {
  total: number;
  skip: number;
  limit: number;
}
export interface Link {
  path: string;
  title: string;
}
export interface LinkType extends Link {
  icon?: IconName;
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

export type Action =
  | 'view'
  | 'update'
  | 'delete'
  | 'create'
  | 'book'
  | 'return';

export interface ActionsProps {
  actions: IconName[];
  onAction: VoidFun<IconName>;
}

export type VoidFun<T = any> = (val: T) => void;

export interface ActionButtonProps {
  action: IconName;
  onAction: VoidFun<IconName>;
}

export interface Temp<T = any> {
  action: IconName;
  data: T;
}

export interface OptionType<T = any> {
  id: T;
  name: string;
}

export type Genre =
  | 'Fantasy'
  | 'Science Fiction'
  | 'Mystery'
  | 'Historical Fiction'
  | 'Romance'
  | 'Thriller'
  | 'Drama'
  | 'Adventure'
  | 'Literary Fiction';
