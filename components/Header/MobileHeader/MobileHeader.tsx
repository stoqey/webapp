import React, { useState } from 'react';
import { FiMenu, FiMoreHorizontal } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import Sticky from 'react-stickynode';
import { useRouter } from 'next/router';
import { Button } from 'baseui/button';
import { Drawer } from 'baseui/drawer';
import { Block } from 'baseui/block';
import Badge from '../../UiElements/Badge/Badge';
import Logo from '../../UiElements/Logo/Logo';
import SvgIcon from '../../UiElements/SvgIcon/SvgIcon';
import TopMenu from '../HeaderMenu/TopMenu/TopMenu';
import MainMenu from '../HeaderMenu/MainMenu/MainMenu';
import HomeMenu from '../HeaderMenu/HomeMenu/HomeMenu';
import BetaMenu from '../HeaderMenu/BetaMenu/BetaMenu';
import AvatarMenu from '../HeaderMenu/AvatarMenu/AvatarMenu';
import {
	useThemeSwitcherCtx,
	THEME,
} from '../../../contexts/theme/theme.provider';
import { useCartState } from '../../../contexts/cart/cart.provider';
import HeaderWrapper, {
	PageTitle,
	TopMenuWrapper,
} from './MobileHeader.styled';
import StqRoboIcon from '@/components/logo/icon';
import { CurrencyNumberContainer } from 'containers/Currency/CurrencyNumber';

const MobileHeader: React.FC<{}> = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [menu, setMenu] = useState('main');
	const { pathname } = useRouter();
	const { theme } = useThemeSwitcherCtx();
	const cartItems = useCartState('cartItems');

	let titleColor = '#000000';
	if (theme === THEME.dark) {
		titleColor = '#ffffff';
	}

	let placement;
	if (menu === 'main') {
		placement = 'left';
	}
	if (menu === 'top') {
		placement = 'right';
	}

	return (
		<Sticky>
			<HeaderWrapper className="mobile">
				<Button
					onClick={() => {
						setIsOpen(true);
						setMenu('main');
					}}
					kind="minimal"
					size="compact"
					overrides={{
						BaseButton: {
							style: ({ $theme }) => {
								return {
									fontSize: '22px',
									// width: '104px',
									justifyContent: 'flex-start',
									':hover': {
										backgroundColor: $theme.colors.primaryB,
									},
									':focus': {
										backgroundColor: $theme.colors.primaryB,
									},
								};
							},
						},
					}}
				>
					<p style={{ padding: 20 }}><GiHamburgerMenu /></p>

				</Button>

				<p style={{ display: "flex", alignItems: "center"}}>
					<StqRoboIcon />
					<CurrencyNumberContainer />
				</p>


				<Block
					overrides={{
						Block: { style: { display: 'flex', alignItems: 'center' } },
					}}
				>
					{/* <Badge
						path="/shop/checkout"
						style={{ margin: '0 20px' }}
						icon={
							<SvgIcon
								src={require('assets/images/cart-bag.svg?include')}
							/>
						}
						count={cartItems.length}
					/> */}

					<Button
						onClick={() => {
							setIsOpen(true);
							setMenu('top');
						}}
						kind="minimal"
						size="compact"
						overrides={{
							BaseButton: {
								style: ({ $theme }) => {
									return {
										fontSize: '24px',
										':hover': {
											backgroundColor: $theme.colors.primaryB,
										},
										':focus': {
											backgroundColor: $theme.colors.primaryB,
										},
									};
								},
							},
						}}
					>
						<FiMoreHorizontal />
					</Button>
				</Block>
			</HeaderWrapper>

			<Drawer
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				anchor={placement}
				overrides={{
					Root: {
						style: () => {
							return { zIndex: 9999 };
						},
					},

					Close: {
						style: {
							width: '30px',
							height: '30px',
							':focus': {
								borderTopColor: 'transparent',
								borderRightColor: 'transparent',
								borderBottomColor: 'transparent',
								borderLeftColor: 'transparent',
							},
						},
					},
				}}
			>
				{menu === 'main' && (
					<BetaMenu
						className={`mobile-menu ${theme}`}
						onClick={() => setIsOpen(false)}
					/>
				)}

				{menu === 'top' && (
					<TopMenuWrapper>
						<TopMenu onClick={() => setIsOpen(false)} />

						<AvatarMenu showOnlyMenu={true} onClick={() => setIsOpen(false)} />
					</TopMenuWrapper>
				)}
			</Drawer>
		</Sticky>
	);
};

export default MobileHeader;
