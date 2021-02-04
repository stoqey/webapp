import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Grid, Cell } from 'baseui/layout-grid';
import { FaShoppingBag, FaMapMarkerAlt, FaMoneyCheckAlt, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { Block } from 'baseui/block';
import Container from 'components/UiElements/Container/Container';
import PageTitle from 'components/UiElements/PageTitle/PageTitle';
import Cart from 'containers/Shop/Cart';
import Address from 'containers/Shop/Address';
import Payment from 'containers/Shop/Payment';
import {
	MenuStep,
	ListItem,
	Title,
	PriceList,
	PriceItem,
} from 'components/PageStyles/Checkout.styled';
import { useCartState } from 'contexts/cart/cart.provider';
import { calcCartItemsTotal } from 'contexts/cart/cart.utils';
import {
	THEME,
	useThemeSwitcherCtx,
} from 'contexts/theme/theme.provider';

import LazyChart from 'containers/Chart';

const TITLE = 'Stoqey';
const SUB_TITLE = 'Beat Wall Street from anywhere';

const Checkout: NextPage<{}> = () => {
	const [step, setStep] = useState(1);
	const cartItems = useCartState('cartItems');
	const totalPrice = calcCartItemsTotal(cartItems);
	const { theme } = useThemeSwitcherCtx();

	const handleStep = () => {
		setStep(step + 1);
	};

	let component: React.ReactNode;
	switch (step) {
		case 1:
			component = <Cart products={cartItems} />;
			break;
		case 2:
			component = <Address />;
			break;
		case 3:
			component = <LazyChart />;
			break;
	}

	return (
		<>
			<Head>
				<title>{TITLE} | Stoqey.</title>
				<meta name="Description" content={SUB_TITLE} />
			</Head>

			<PageTitle
				title={TITLE}
				subtitle={SUB_TITLE}
				backdrop={false}
				bgColor={theme === THEME.light ? '#ffffff' : '#000000'}
			/>

			<Container>
				<MenuStep className="step-menu">

					<ListItem
						className={step === 1 ? 'active' : ''}
						onClick={() => setStep(1)}
					>
						<FaDollarSign />
						<Block
							overrides={{
								Block: {
									style: ({ $theme }) => {
										return {
											paddingLeft: '5px',
											paddingRight: '5px',
											color: $theme.colors.primaryA,
										};
									},
								},
							}}
						>
							Currency
						</Block>
					</ListItem>
					<ListItem
						className={step === 2 ? 'active' : ''}
						onClick={() => setStep(2)}
					>
						<FaChartLine />
						<Block
							overrides={{
								Block: {
									style: ({ $theme }) => {
										return {
											paddingLeft: '5px',
											paddingRight: '5px',
											color: $theme.colors.primaryA,
										};
									},
								},
							}}
						>
							Data
						</Block>
					</ListItem>
					<ListItem
						className={step === 3 ? 'active' : ''}
						onClick={() => setStep(3)}
					>
						<FaChartLine />
						<Block
							overrides={{
								Block: {
									style: ({ $theme }) => {
										return {
											paddingLeft: '5px',
											paddingRight: '5px',
											color: $theme.colors.primaryA,
										};
									},
								},
							}}
						>
							Chart
						</Block>
					</ListItem>
				</MenuStep>

				<Block marginLeft={[0, 0, 0, '-25px']} marginRight={[0, 0, 0, '-25px']}>
					<Grid
						gridColumns={12}
						gridGaps={[40, 50, 0]}
						gridGutters={[0, 0, 50]}
						gridMargins={0}
					>
						<Cell span={[12, 12, 8]}>{component}</Cell>
						<Cell span={[12, 12, 4]}>
							<Block paddingTop={['30px', '40px', '0']}>
								<Title>Portfolios</Title>
								<Input
									onChange={(e: any) => console.log(e.target.value)}
									placeholder="Start new position"
									overrides={{
										InputContainer: {
											style: () => {
												return { backgroundColor: 'transparent' };
											},
										},
									}}
								/>
								<PriceList>
									<PriceItem>
										<span>Per share</span> <span>$ some price</span>
									</PriceItem>
									<PriceItem>
										<span>Total Price</span> <span>$95</span>
									</PriceItem>
									<PriceItem>
										<span>Coupon Discount</span> <span>0</span>
									</PriceItem>
								</PriceList>
								<Button
									size="large"
									onClick={handleStep}
									overrides={{
										BaseButton: {
											style: ({ $theme }) => {
												return {
													width: '100%',
													...$theme.typography.font250,
												};
											},
										},
									}}
								>
									Buy
									</Button>
							</Block>
						</Cell>

					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Checkout;
