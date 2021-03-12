import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'baseui/button';
import { MarketDataType, PortfolioType } from '@stoqey/client-graphql'
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

const stoqeyLogo = require('assets/images/STQ.png');


interface PortfolioItem {
	id: string;
	thumb: any; // stoqeyLogo
	title: string; // 'Stoqey',
	description: string; // 'Number of shares',
};

const Positions: NextPage<{}> = () => {
	let toastKey = null;
	const client = useApolloClient();
	const [showNew, setShowNew] = useState(false);
	const [showClose, setShowClose] = useState(false);
	const quote: MarketDataType = useAppEvent(APPEVENTS.CURRENCY);
	const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioType>(null);
	const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);


	React.useEffect(() => {
		getPortfoliosPaginationApi({
			client,
			success: async (portfolios) => {
				const portfoliosToSave = portfolios.map(port => ({
					id: port.id,
					thumb: stoqeyLogo,
					title: 'Stoqey',
					description: `${port.action} ${port.size} @${port.averageCost}`,
				}));

				
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


	return (
		<>
			<Toaster toastKey={toastKey} />
			<StartPortfolio quote={quote} onError={onError} onSuccess={onSuccess} show={showNew} hide={() => setShowNew(false)} />
			<ClosePortfolio onError={onError} onSuccess={onSuccess} show={showClose} hide={() => setShowClose(false)} portfolio={selectedPortfolio} />

			{portfolios.map((item: any) => (
				<SpaceBetween key={`application-key${item.id}`}>
					{/* <ListGridCard
						variant="list"
						thumbWidth={`50px`}
						thumb={item.thumb}
						title={item.title}
						description={item.description}
					/> */}

					<Button
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
					>Close position</Button>
				</SpaceBetween>
			))}

			{/* Start new portfolio */}
			<SpaceBetween key={`start-new-portfolio`}>
				<Button
					onClick={() => setShowNew(true)}
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
				>Buy/Sell Stoqey</Button>
			</SpaceBetween>
		</>
	);
};

export default Positions;
