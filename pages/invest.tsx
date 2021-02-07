import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { FaShoppingBag, FaMapMarkerAlt, FaMoneyCheckAlt, FaMoneyBillWave, FaPaypal, FaCreditCard, FaPiggyBank, FaBitcoin } from 'react-icons/fa';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { Block } from 'baseui/block';
import Container from 'components/UiElements/Container/Container';
import PageTitle from 'components/UiElements/PageTitle/PageTitle';
import CurrencyCart from 'containers/Shop/CurrencyCart';
import PayPalPayment from 'containers/Shop/PayPalPayment';
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
import { useUserInfo } from 'hooks/useUserInfo';

const TITLE = 'Invest';
const SUB_TITLE = 'Invest in Stoqey';

const Checkout: NextPage<{}> = () => {
	const [amount, setAmount] = useState(3);
	const [step, setStep] = useState(1);
	const cartItems = useCartState('cartItems');
	const totalPrice = calcCartItemsTotal(cartItems);
	const { theme } = useThemeSwitcherCtx();
	const user = useUserInfo();

	const handleStep = () => {
		setStep(step + 1);
	};

	let component: React.ReactNode;
	switch (step) {
		case 1:
			component = <CurrencyCart quantity={0} price={100} products={cartItems} />;
			break;
		case 2:
			component = <PayPalPayment amount={amount} userId={user && user.accessToken}/>;
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
						<FaMoneyBillWave />
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
							Amount
						</Block>
					</ListItem>
					<ListItem
						className={step === 2 ? 'active' : ''}
						onClick={() => setStep(2)}
					>
						<FaPaypal />
						<FaCreditCard />
						<FaBitcoin />
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
							Payment
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
						{step !== 3 && (
							<Cell span={[12, 12, 4]}>
								<Block paddingTop={['30px', '40px', '0']}>
									<Title>Amount Details</Title>
									<Input
									    disabled={step !== 1}
										type={"number"}
										onChange={(e: any) => setAmount(e.target.value)}
										placeholder="Enter size/quantity"
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
											<span>Per share</span> <span>$ {amount}</span>
										</PriceItem>
										<PriceItem>
											<span>Tax</span> <span> + 0.5%</span>
										</PriceItem>
										<PriceItem>
											<span>Total</span> <span> + 0.5%</span>
										</PriceItem>
									</PriceList>
									{step === 1 && (
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
											Next
										</Button>
									)}

								</Block>
							</Cell>
						)}
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Checkout;
