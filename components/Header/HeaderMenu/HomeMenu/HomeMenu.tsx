import React from 'react';
import ActiveLink from '../../../UiElements/NavLink/NavLink';
import Menu, { MenuItem, MenuLink } from './HomeMenu.styled';

const menuItems = [
  {
    id: 1,
    label: 'Overview',
    path: '/web',
  },
  // {
  //   id: 2,
  //   label: 'OrderBook',
  //   path: '/web/orderbook',
  // },
  {
    id: 3,
    label: 'Join',
    path: '/web/login',
  }
];

type MenuProps = {
  className?: string;
  onClick?: () => void;
};

const MainMenu = ({ className, onClick }: MenuProps) => {
  return (
    <Menu className={className}>
      {menuItems.map(item => (
        <MenuItem key={`top-menu--item${item.id}`} onClick={onClick}>
          <ActiveLink activeClassName="active" href={item.path}>
            <MenuLink>{item.label}</MenuLink>
          </ActiveLink>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MainMenu;
