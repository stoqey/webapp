import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'components/button';
import sum from 'lodash/sum';
import { MarketDataType, PortfolioType, getPercentageGain, getProfitFromTrade, ActionType, IOrderType } from '@stoqey/client-graphql'
import { BsFillTriangleFill, BsPlus } from 'react-icons/bs';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import ListGridCard from 'components/UiElements/ListGridCard/ListGridCard';
import {
	SpaceBetween,
} from '../../components/PageStyles/Settings.styled';
import { toaster } from 'baseui/toast';
import applicationsPageData from '../../data/applicationsPage';
import TradeEditor from './TradeEditor.modal';
import ClosePortfolio from './ClosePortfolio.modal';
import { ImCross } from 'react-icons/im';
import { getPortfoliosPaginationApi } from './portfolios.api';
import { useApolloClient } from '@apollo/client';
import Toaster from '@/components/UiElements/Toaster/Toaster';
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';
import { Block } from 'baseui/block';
import StqRoboIcon from '@/components/logo/icon';
import { niceDec } from 'utils/number';
import { H2, H4, H6, Paragraph1, Paragraph2, Paragraph3, Paragraph4 } from 'baseui/typography';
import { getTradeColor } from 'utils/colors';
import { Select } from 'baseui/select';
import { isEmpty } from 'lodash';
import ResultsDialog from '@/components/Modal/Result.dialog';
import { TradeEditorState } from './TradeEditor.modal'
import OrdersListContainer from 'containers/OrderBook/OrdersListContainer';
const stoqeyLogo = require('assets/images/STQ.png');


interface PortfolioItem extends PortfolioType {
	id: string;
	thumb: any; // stoqeyLogo
	title: string; // 'Stoqey',
	description: string; // 'Number of shares',
};

const portEg = {
	id: 'stq',
	title: 'Stoqey',
	description: 'Number of shares',
};

interface State {
	showResults: boolean;
	showEditor: boolean;
	showInfo: boolean;
	selectedPortfolio: PortfolioItem[];
	portfolios: PortfolioItem[];

	// api status
	message: string;
	success: boolean;

	editor?: TradeEditorState
};

const Portfolio: NextPage<{}> = () => {
	let toastKey = null;
	const client = useApolloClient();

	const quote: MarketDataType = useAppEvent(APPEVENTS.CURRENCY);

	const [state, setState] = useState<State>({
		showResults: false,
		showEditor: false,
		showInfo: false,
		selectedPortfolio: null,
		portfolios: [],

		// api status
		message: "Successfully submitted order",
		success: true,
	});

	const changeState = (field: string) => {
		return (val) => {
			setState({
				...state,
				[field]: val
			})
		}
	};

	const {
		showResults,
		showEditor,
		showInfo,
		selectedPortfolio,
		portfolios,
		message,
		success,
		editor
	} = state;

	const price = quote && quote.close | 0;

	const closePortfolio = (closeProps: TradeEditorState) => {
		setState({
			...state,
			editor: closeProps,
			showEditor: true,
		})
	}

	const startPortfolio = () => {
		setState({
			...state,
			editor: {
				steps: 0,
				type: IOrderType.MARKET,
				action: ActionType.BUY,
				price,
				qty: 1,
			},
			showEditor: true,
		})
	}

	React.useEffect(() => {
		getPortfoliosPaginationApi({
			client,
			success: async (portfolios) => {
				const portfoliosToSave = portfolios.map(port => ({
					id: port.id,
					thumb: stoqeyLogo,
					title: 'STQ',
					description: `Stoqey Inc`,
					...port,
				}));

				changeState("portfolios")(portfoliosToSave);
			},
		})
	}, [!showEditor])

	const onSuccess = (message: string) => {
		toastKey = toaster.positive(<>{message}</>, {
			autoHideDuration: 4000
		})
	}

	const onError = (message: string) => {
		toastKey = toaster.negative(<>{message}</>, {
			autoHideDuration: 5000
		})
	}


	const sortOptions = [
		{ label: 'Sort by A', value: 'a' },
		{ label: 'Sort by B', value: 'b' },
		{ label: 'Sort by C', value: 'c' },
	];

	// @ts-ignore
	const totalProfit: any = sum(!isEmpty(portfolios) ?
		portfolios.map(i => {
			const profit = getProfitFromTrade(i.action, i.averageCost, price) / 100;
			const amountSpent = i.size * i.averageCost;
			const amountProfit = profit * (amountSpent);
			return amountProfit;
		}) : 0);

	const setShowEditor = (show: boolean = true) => changeState("showEditor")(show);

	return (
		<>
			<Toaster toastKey={toastKey} />
			{showEditor && <TradeEditor portfolios={portfolios} state={editor} quote={quote} onError={onError} onSuccess={(props) => {
				const { message, success } = props;
				setState({
					...state,
					message,
					success,
					showResults: true,
					showEditor: false,
				});
			}} show={true} hide={() => setShowEditor(false)} />}


			{/* Model success */}
			<ResultsDialog title={message} success={success} show={showResults} hide={() => changeState("showResults")(false)}
				content={[
					// { title: "Amount", value: +amount },
				]}
			/>

			{/* Sort and Unrealised profit */}
			<SpaceBetween>
				<Select
					options={sortOptions}
					// value={value}
					placeholder="Sort"
					// onChange={handleSort}
					overrides={{
						Root: {
							style: () => {
								return { width: '100px' };
							},
						},
						ControlContainer: {
							style: () => {
								return {
									borderWidth: 0,
									borderTopLeftRadius: '30px',
									borderTopRightRadius: '30px',
									borderBottomRightRadius: '30px',
									borderBottomLeftRadius: '30px',
									backgroundColor: 'transparent',
								};
							},
						},
						ValueContainer: {
							style: () => {
								return { paddingLeft: 0 };
							},
						},
					}}
				/>

				{/* Unrealized profit */}
				<div style={{ textAlign: 'center' }}>
					<H6 $style={{ color: getTradeColor(totalProfit) }}>${niceDec(totalProfit)}</H6>
					<Paragraph3>unrealized profit</Paragraph3>
				</div>

			</SpaceBetween>


			{/* Portfolios */}
			{portfolios.map((item: PortfolioItem) => {
				const { action, size } = item
				const profitPct = getProfitFromTrade(item.action, item.averageCost, price);
				const amountSpent = item.size * item.averageCost;
				const amountProfitIfSold = item.size * price;
				const profitAmount = amountProfitIfSold - amountSpent;

				const pnL = profitAmount;

				const closeProps: TradeEditorState = {
					steps: 0,
					action: action === ActionType.BUY ? ActionType.SELL : ActionType.BUY,
					type: IOrderType.MARKET,
					price: 0,
					qty: size,
				};

				const closeThisPosition = () => {
					closePortfolio(closeProps);
				}

				return (
					<SpaceBetween key={`application-key${item.id}`}>

						{action === ActionType.BUY ? (
							<GoTriangleUp
								size="2em"
								color="#3AA76D"
							// style={{ marginBottom: '20px' }}
							/>
						) : (
							<GoTriangleDown
								size="2em"
								color="red"
							// style={{ marginBottom: '20px' }}
							/>
						)}

						<ListGridCard
							variant="list"
							thumbWidth={`50px`}
							thumb={item.thumb}
							title={item.title}
							description={item.description}
						/>

						{/* Average cost / shares */}
						<div style={{ textAlign: "center" }}>
							<H6>${item.averageCost}</H6>
							<Paragraph2>{item.size} shares</Paragraph2>
						</div>

						{/* Amount spent / Profit & Loss */}
						{/* <div>
							<H6> {item.size} * {item.averageCost} = ${niceDec(amountSpent)}</H6>
							<Paragraph2 $style={{ color: getTradeColor(profitPct) }}> ${niceDec(pnL)} </Paragraph2>
						</div> */}

						{/* Percentage / Profit Amount */}
						<div style={{ textAlign: "center" }}>
							<H6 $style={{ color: getTradeColor(profitAmount) }}>{niceDec(profitPct)}%</H6>
							<Paragraph3 $style={{ color: getTradeColor(profitAmount) }}>${niceDec(profitAmount)}</Paragraph3>
						</div>

						{/* Close trade */}
						<div>
							<Button shape="round" $style={{ backgroundColor: 'blueviolet' }}
								onClick={() => closeThisPosition()}>
								<ImCross />
							</Button>
							<h4> </h4>
						</div>
					</SpaceBetween>
				)
			}
			)}

			{/* Start new portfolio */}
			<Block $style={{
				display: 'flex',
				justifyContent: 'center',
				padding: '20px'
			}}>
				<Button
					onClick={() => startPortfolio()}
					kind="primary"
					shape="pill"
					overrides={{
						BaseButton: {
							style: ({ $theme }) => {
								return {
									...$theme.typography.font750,
									minWidth: '110px',
									display: 'flex',
									backgroundColor: 'goldenrod'
									// paddingLeft: '15px',
									// paddingRight: '15px'
									// fontSize: '22px'
								};
							},
						},
					}}
				>
					<div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
						{/* <StqRoboIcon gold /> */}
						{/* <GoTriangleUp
							size="2em"
							color="#3AA76D"
						// style={{ marginBottom: '20px' }}
						/> */}
						<p style={{ margin: "2px" }}>
							+ TRADE
						</p>
						{/* <GoTriangleDown
							size="2em"
							color="red"
						// style={{ marginBottom: '20px' }}
						/> */}
						{/* <StqRoboIcon /> */}
					</div>
				</Button>
			</Block>

			<OrdersListContainer filterMine />
		</>
	);
};

export default Portfolio;
