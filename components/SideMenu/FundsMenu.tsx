import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Sticky from 'react-stickynode';
import MenuWrapper, { Menu, MenuItem, MenuLink } from './SideMenu.styled';

const menuItems = [
	
	{
		id: 1,
		label: 'Add funds',
		path: '/funds',
	},
	{
		id: 3,
		label: 'Transactions',
		path: '/history',
	},
	{
		id: 4,
		label: 'Withdraw',
		path: '/withdraw',
	}
];

type MenuProps = {
	className?: string;
	onClick?: () => void;
};

const FundsMenu = ({ className = '', onClick }: MenuProps) => {
	const { pathname } = useRouter();

	return (
		<Sticky top=".navbar" innerZ="1">
			<MenuWrapper className="side-menu-wrapper">
				<Menu className={`side-menu ${className}`}>
					{menuItems.map((item) => (
						<MenuItem key={`side-menu--key${item.id}`} onClick={onClick}>
							<Link href={item.path}>
								<MenuLink className={pathname === item.path ? 'active' : ''}>
									{item.label}
								</MenuLink>
							</Link>
						</MenuItem>
					))}
				</Menu>
			</MenuWrapper>
		</Sticky>
	);
};

export default FundsMenu;
