import { JwtHelperService } from '@auth0/angular-jwt';
import { NbMenuItem } from '@nebular/theme';

function getAccessLevel(): number {
  try {
    const token = localStorage.getItem('access-token');
    if (!token) return -1;

    const helper = new JwtHelperService();
    const decoded: any = helper.decodeToken(token);

    return decoded?.accessLevel;
  } catch (e) {
    return -1;
  }
}

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'pie-chart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Check Inventory Item',
    icon: 'checkmark-outline',
    link: '/pages/check-inventory',
  },
  {
    title: 'Catalog',
    icon: 'bookmark-outline',
    link: '/pages/catalog',
  },
  {
    title: 'Reports',
    icon: 'bar-chart-2-outline',
    children: [
      {
        title: 'Inventory',
        icon: 'file-outline',
        link: '/pages/inventory-reports',
      },
      {
        title: 'Sales',
        icon: 'file-outline',
        link: '/pages/sales-reports',
      },
      {
        title: 'Expenses',
        icon: 'file-outline',
        link: '/pages/expenses',
      },
      {
        title: 'Gems',
        icon: 'file-outline',
        link: '/pages/gems-reports',
      },
    ],
  },
  {
    title: 'Client 360° View',
    icon: 'refresh-outline',
    link: '/pages/client-view',
  },
];

export function getMenuItems(): NbMenuItem[] {
  const accessLevel = getAccessLevel();
  return [
    {
      title: 'Dashboard',
      icon: 'pie-chart-outline',
      link: '/pages/dashboard',
      home: true,
      hidden: !(accessLevel === 1),
    },
    {
      title: 'Check Inventory Item',
      icon: 'checkmark-outline',
      link: '/pages/check-inventory',
    },
    {
      title: 'Catalog',
      icon: 'bookmark-outline',
      link: '/pages/catalog',
    },
    {
      title: 'Reports',
      icon: 'bar-chart-2-outline',
      hidden: !(accessLevel === 1), // Entire 'Reports' section hidden if not admin
      children: [
        {
          title: 'Inventory',
          icon: 'file-outline',
          link: '/pages/inventory-reports',
        },
        {
          title: 'Sales',
          icon: 'file-outline',
          link: '/pages/sales-reports',
        },
        {
          title: 'Expenses',
          icon: 'file-outline',
          link: '/pages/expenses',
        },
        {
          title: 'Gems',
          icon: 'file-outline',
          link: '/pages/gems-reports',
        },
      ],
    },
    {
      title: 'Client 360° View',
      icon: 'refresh-outline',
      link: '/pages/client-view',
      hidden: accessLevel === 2,
    },
  ];
}
