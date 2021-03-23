import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'baseui/button';
import sum from 'lodash/sum';
import { MarketDataType, PortfolioType, getPercentageGain, getProfitFromTrade } from '@stoqey/client-graphql'
import { BsFillTriangleFill, BsPlus } from 'react-icons/bs';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import ListGridCard from 'components/UiElements/ListGridCard/ListGridCard';
import {
	SpaceBetween,
} from '../../components/PageStyles/Settings.styled';
import { toaster } from 'baseui/toast';
import applicationsPageData from '../../data/applicationsPage';
import StartPortfolio from './StartPortfolio.modal';
import ClosePortfolio from './ClosePortfolio.modal';

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

const Positions: NextPage<{}> = () => {
	let toastKey = null;
	const client = useApolloClient();
	const [showNew, setShowNew] = useState(false);
	const [showClose, setShowClose] = useState(false);
	const quote: MarketDataType = useAppEvent(APPEVENTS.CURRENCY);
	const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioType>(null);
	const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);

	const price = quote && quote.close | 0;

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

				console.log('data is', portfoliosToSave);


				setPortfolios(portfoliosToSave);
			},
		})
	}, [!showNew, !showClose])

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



	// price - averageCost
	// average, price %
	// % / 100 * amount(averageCost * qty)
	// const getProfits = (accumulator, currentValue: PortfolioType) => accumulator + ((getProfitFromTrade(currentValue.action, currentValue.averageCost, price)/100) * (currentValue.size * currentValue.averageCost), 0);
	const getProfits = (accumulator, currentValue: PortfolioType) => (accumulator + currentValue.averageCost);


	// @ts-ignore
	const totalProfit: any = sum(!isEmpty(portfolios) ?
		portfolios.map(i => {
			const profit = getProfitFromTrade(i.action, i.averageCost, price) / 100;
			const amountSpent = i.size * i.averageCost;
			const amountProfit = profit * (amountSpent);
			return amountProfit;
		}) : 0);

	return (
		<>
			<Toaster toastKey={toastKey} />
			<StartPortfolio quote={quote} onError={onError} onSuccess={onSuccess} show={showNew} hide={() => setShowNew(false)} />
			<ClosePortfolio onError={onError} onSuccess={onSuccess} show={showClose} hide={() => setShowClose(false)} portfolio={selectedPortfolio} />

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
				{/* Remove all */}
				{/* <Button
										onClick={handleRemoveAll}
										kind="secondary"
										shape="pill"
										overrides={{
											BaseButton: {
												style: ({ $theme }) => {
													return {
														...$theme.typography.font250,
														minWidth: '101px',
													};
												},
											},
										}}
									>
										Remove all
									</Button> */}

				<div style={{ textAlign: 'center' }}>
					<H6 $style={{ color: getTradeColor(totalProfit)}}>${niceDec(totalProfit)}</H6>
					<Paragraph3>unrealized profit</Paragraph3>
				</div>

			</SpaceBetween>

			{portfolios.map((item: any) => {

				const profitPct = getProfitFromTrade(item.action, item.averageCost, price) / 100;
				const amountSpent = item.size * item.averageCost;
				const profit = profitPct * amountSpent;

				return (
					<SpaceBetween key={`application-key${item.id}`}>
						<ListGridCard
							variant="list"
							thumbWidth={`50px`}
							thumb={item.thumb}
							title={item.title}
							description={item.description}
						/>

						<div>
							<h2> </h2>
							<h4> </h4>
						</div>
						<div>
							<h2> </h2>
							<h4> </h4>
						</div>
						<div>
							<H6>${item.averageCost}</H6>
							<Paragraph2>{item.size} shares</Paragraph2>
						</div>
						<div>
							<H6>{niceDec(profitPct)}%</H6>
							<Paragraph3 $style={{ color: getTradeColor(profit) }}>${niceDec(profit)}</Paragraph3>
						</div>
						{/* <Button
						onClick={() => {
							setSelectedPortfolio(item);
							setShowClose(true);
						}}
						kind="secondary"
						shape="pill"
						overrides={{
							BaseButton: {
								style: ({ $theme }) => {
									return {
										...$theme.typography.font250,
										minWidth: '82px',
									};
								},
							},
						}}
					>Close position</Button> */}
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
					onClick={() => setShowNew(true)}
					kind="primary"
					shape="square"
					overrides={{
						BaseButton: {
							style: ({ $theme }) => {
								return {
									...$theme.typography.font750,
									minWidth: '110px',
									display: 'flex',
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
						<GoTriangleUp
							size="2em"
							color="#3AA76D"
						// style={{ marginBottom: '20px' }}
						/>
						<p style={{ margin: "10px" }}>
							TRADE
						</p>
						<GoTriangleDown
							size="2em"
							color="red"
						// style={{ marginBottom: '20px' }}
						/>
						{/* <StqRoboIcon /> */}
					</div>
				</Button>
			</Block>
		</>
	);
};

export default Positions;
