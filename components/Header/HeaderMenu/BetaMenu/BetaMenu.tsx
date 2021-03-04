import { useRouter } from 'next/router';
import React from 'react';
import ActiveLink from '../../../UiElements/NavLink/NavLink';
import Menu, { MenuItem, MenuLink } from './BateMenu.styled';

const menuItems = [
  {
    id: 1,
    label: 'Home',
    path: '/web/home',
  },
  {
    id: 2,
    label: 'Invest',
    path: '/web/invest',
  },
  {
    id: 3,
    label: 'Portfolio',
    path: '/web/portfolio',
  },
  // {
  //   id: 4,
  //   label: 'Account',
  //   path: '/web/account',
  // },
  // {
  //   id: 5,
  //   label: 'OrderBook',
  //   path: '/web/orderbook',
  // },
];

type MenuProps = {
  className?: string;
  onClick?: () => void;
};

const BetaMenu = ({ className, onClick }: MenuProps) => {
  const { pathname } = useRouter();
  return (
    <Menu className={className}>
      {menuItems.map(item => (
        <MenuItem key={`top-menu--item${item.id}`} onClick={onClick}>
          <ActiveLink activeClassName="active" href={item.path}>
            <MenuLink className={pathname === item.path ? 'active' : ''}>{item.label}</MenuLink>
          </ActiveLink>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default BetaMenu;
