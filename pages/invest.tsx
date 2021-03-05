import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { MarketDataType } from '@stoqey/client-graphql';
import { FaShoppingBag, FaMapMarkerAlt, FaMoneyCheckAlt, FaMoneyBillWave, FaPaypal, FaCreditCard, FaPiggyBank, FaBitcoin } from 'react-icons/fa';
import { Button } from 'baseui/button';
import { ButtonGroup } from 'baseui/button-group';
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
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';
import { niceDec } from 'utils/number';

const TITLE = 'Invest';
const SUB_TITLE = 'Invest in Stoqey';

interface State {
	step: number;
	amountType: 'amount' | 'qty';
	inputAmount: number;
	inputQty: number;
}

const Checkout: NextPage<{}> = () => {
	const [state, setState] = useState<State>({
		step: 1,
		amountType: 'amount',
		inputAmount: 5,
		inputQty: 1,
	});
	const cartItems = useCartState('cartItems');

	const { theme } = useThemeSwitcherCtx();
	const user = useUserInfo();

	const qoute: MarketDataType = useAppEvent(APPEVENTS.CURRENCY);

	const stqPrice = qoute.close || 0;
	const currencyPrice = qoute && qoute.close || 0;

	const { step, inputAmount, inputQty, amountType } = state;

	const totalPrice = niceDec(amountType === "amount" ? +inputAmount : inputQty * stqPrice);

	const handleChange = (field: string) => {
		return (val: any) => {
			setState({
				...state,
				[field]: val
			});
		}

	};

	let component: React.ReactNode;
	switch (step) {
		case 1:
			component = <CurrencyCart amount={totalPrice} products={cartItems} />;
			break;
		case 2:
			component = <PayPalPayment amount={totalPrice} userId={user && user.user && user.user.id} />;
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
						onClick={() => handleChange("step")(1)}
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
						onClick={() => handleChange("step")(2)}
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
						{step !== 3 && (
							<Cell span={[12, 12, 4]}>
								<Block paddingTop={['30px', '40px', '0']}>
									<Title>Payment Details</Title>
									<div>
										<Button disabled={step !== 1} size="compact" kind={amountType === "amount" ? "primary" : "secondary"} onClick={() => handleChange("amountType")("amount")}>Amount</Button>
										<Button disabled={step !== 1} size="compact" kind={amountType === "qty" ? "primary" : "secondary"} onClick={() => handleChange("amountType")("qty")}>Quantity</Button>
									</div>
									{amountType === "amount" ? (
										<Input
											disabled={step !== 1}
											type={"number"}
											value={inputAmount}
											onChange={(e: any) => handleChange("inputAmount")(+e.target.value)}
											placeholder="Amount"
											overrides={{
												InputContainer: {
													style: () => {
														return { backgroundColor: 'transparent' };
													},
												},
											}}
										/>
									) :
										(
											<Input
												disabled={step !== 1}
												type={"number"}
												value={inputQty}
												onChange={(e: any) => handleChange("inputQty")(+e.target.value)}
												placeholder="Qty"
												overrides={{
													InputContainer: {
														style: () => {
															return { backgroundColor: 'transparent' };
														},
													},
												}}
											/>
										)
									}


									<PriceList>
										<PriceItem>
											<span>Per share</span> <span>$ {currencyPrice}</span>
										</PriceItem>
										<PriceItem>
											<span>Total</span> <span>${totalPrice}</span>
										</PriceItem>
										{/* <PriceItem>
											<span>Tax</span> <span> + 0.5%</span>
										</PriceItem>
										<PriceItem>
											<span>Total</span> <span> + 0.5%</span>
										</PriceItem> */}
									</PriceList>
									{step === 1 && (
										<Button
											size="large"
											shape="pill"
											onClick={() => handleChange("step")(2)}
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
						<Cell span={[12, 12, 8]}>{component}</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Checkout;
