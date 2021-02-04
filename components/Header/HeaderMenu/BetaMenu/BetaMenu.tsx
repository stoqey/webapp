import React from 'react';
import ActiveLink from '../../../UiElements/NavLink/NavLink';
import Menu, { MenuItem, MenuLink } from './BateMenu.styled';

const menuItems = [
  {
    id: 0,
    label: 'Dash',
    path: '/',
  },
  {
    id: 1,
    label: 'Home',
    path: '/home',
  },
  {
    id: 2,
    label: 'Invest',
    path: '/invest',
  },
  {
    id: 3,
    label: 'Portfolio',
    path: '/portfolio',
  },
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
