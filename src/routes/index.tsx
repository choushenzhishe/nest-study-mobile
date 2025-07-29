
import type { JSX } from 'react';
import My from '../pages/my';

interface IRoute {
  path: string;
  name: string;
  element: () => JSX.Element;
  key: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  PAGE_404: '404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {

  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '我的',
    element: () => <My />,
    key: 'my',
    hideInMenu: true,
    // icon: <UserOutlined />,
  },

};

export const routes = Object.values(ROUTE_CONFIG);

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
