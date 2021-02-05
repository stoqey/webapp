import React from 'react';
import Sticky from 'react-stickynode';
import Badge from '../../UiElements/Badge/Badge';
import Logo from '../../UiElements/Logo/Logo';
import SvgIcon from '../../UiElements/SvgIcon/SvgIcon';
import Container from '../../UiElements/Container/Container';
import TopMenu from '../HeaderMenu/TopMenu/TopMenu';
import BetaMenu from '../HeaderMenu/BetaMenu/BetaMenu';
import AvatarMenu from '../HeaderMenu/AvatarMenu/AvatarMenu';
import { useCartState } from '../../../contexts/cart/cart.provider';
import HeaderWrapper, {
	TopBar,
	MenuRight,
	Navbar,
	StickyNav,
	NavLeft,
	NavRight,
} from './DefaultHeader.styled';

const DefaultHeader: React.FC<{}> = () => {
	const cartItems = useCartState('cartItems');

	return (
		<HeaderWrapper className="default">
			<Container>
				<TopBar className="top-bar">
					<Logo
						path="/"
						src={
							<SvgIcon
								src={require('../../../assets/images/logo.svg?include')}
							/>
						}
					/>
					<MenuRight className="menu-right">
						<TopMenu />

						{/* <Badge
							path="/shop/checkout"
							icon={
								<SvgIcon
									src={require('../../../assets/images/cart-bag.svg?include')}
								/>
							}
							count={cartItems.length}
						/> */}
						<AvatarMenu
							name="Stoqey Bot"
							src={require('../../../assets/images/STQ.png')}
						/>
					</MenuRight>
				</TopBar>
			</Container>

			<Sticky>
				<Navbar className="navbar">
					<Container>
						<StickyNav>
							<NavLeft>
								<Logo
									path="/"
									src={
										<SvgIcon
											src={require('../../../assets/images/logo.svg?include')}
										/>
									}
								/>
								<BetaMenu className="main-nav" />
							</NavLeft>
							<NavRight className="cart-and-avatar">
								{/* <Badge
									path="/shop/checkout"
									icon={
										<SvgIcon
											src={require('../../../assets/images/cart-bag.svg?include')}
										/>
									}
									count={cartItems.length}
								/> */}
								<AvatarMenu
									name="Stoqey Bot"
									src={require('../../../assets/images/STQ.png')}
								/>
							</NavRight>
						</StickyNav>
					</Container>
				</Navbar>
			</Sticky>
		</HeaderWrapper>
	);
};

export default DefaultHeader;
