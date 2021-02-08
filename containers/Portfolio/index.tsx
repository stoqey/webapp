import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'baseui/button';
import ListGridCard from 'components/UiElements/ListGridCard/ListGridCard';
import {
	SpaceBetween,
} from '../../components/PageStyles/Settings.styled';

import applicationsPageData from '../../data/applicationsPage';

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
	const [, setValue] = useState([]);



	const handleRemoveApplication = (id: string) => {
		console.log('Remove', id);
	};

	return (
		<>
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
						onClick={() => handleRemoveApplication(item.id)}
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
		</>
	);
};

export default Positions;
