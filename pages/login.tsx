import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import PageTitle from '@/components/UiElements/PageTitle/PageTitle';
import Container from '@/components/UiElements/Container/Container';
import pricingPageData from '../data/pricingPage';
import HighlightChart from 'containers/Chart/HighlightChart';

const PhoneLogin = dynamic(() => import('containers/PhoneLogin'), {
	ssr: false,
});

const Pricing: NextPage<{}> = () => {
	const { title, subtitle, plans } = pricingPageData;
	const [loading, setLoading] = useState(false);
	const [pricingPlan, setPricingPlan] = useState('Free');

	const handlePricingPlan = (type: string) => {
		setLoading(true);
		setPricingPlan(type);

		setTimeout(() => {
			setLoading(false);
		}, 600);
	};

	return (
		<>
			<Head>
				<title>{title} | Stoqey</title>
				<meta name="Description" content="Stoqey Beta" />
			</Head>

			<PageTitle backdrop={false} title={'Stoqey Beta'} subtitle={'Invest in Stoqey PRE-IPO'} />


			<Container>

				{/* Phone Login */}
				<PhoneLogin />
			</Container>
		</>
	);
};

export default Pricing;
