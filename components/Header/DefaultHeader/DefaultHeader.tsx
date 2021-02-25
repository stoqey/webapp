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

					{/* Stoqey logo */}
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
										<div style={{ display: 'flex', justifyContent: 'center' }}>
											<div style={{ textAlign: 'center', padding: '4px' }}>

												{/*  */}
												<div style={{ display: 'flex' }}>
													<h1>$123.5</h1>
													<p style={{ fontSize: '12px' }}>USD</p>
												</div>

												<p style={{ color: 'red' }}>-0.51 (0.40%)</p>
											</div>
										</div>
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
