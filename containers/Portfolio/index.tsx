import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'baseui/button';
import ListGridCard from 'components/UiElements/ListGridCard/ListGridCard';
import {
	SpaceBetween,
} from '../../components/PageStyles/Settings.styled';

import applicationsPageData from '../../data/applicationsPage';
import StartPortfolio from './StartPortfolio.modal';
import ClosePortfolio from './ClosePortfolio.modal';

const stoqeyLogo = require('assets/images/STQ.png');

const positions = [
	{
		id: 1,
		thumb: stoqeyLogo,
		title: 'Stoqey',
		description: 'Number of shares',
	},
];

const Positions: NextPage<{}> = () => {
	const [showNew, setShowNew] = useState(false);
	const [showClose, setShowClose] = useState(false);

	const [selectedPosition, setSelectedPosition] = useState("");



	const handleRemoveApplication = (id: string) => {
		console.log('Remove', id);
	};

	return (
		<>
			<StartPortfolio show={showNew} hide={() => setShowNew(false)} />
			<ClosePortfolio show={showClose} hide={() => setShowClose(false)} />
			
			{positions.map((item: any) => (
				<SpaceBetween key={`application-key${item.id}`}>
					<ListGridCard
						variant="list"
						thumbWidth={`50px`}
						thumb={item.thumb}
						title={item.title}
						description={item.description}
					/>

					<Button
						onClick={() => {
							setSelectedPosition(item.id);
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
