import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import PageTitle from '@/components/UiElements/PageTitle/PageTitle';
import Container from '@/components/UiElements/Container/Container';
import HighlightChart from 'containers/Chart/HighlightChart';
import CurrencyPill from '@/components/Currency';
import OrderBookContainer from 'containers/OrderBook';
import withLayout from 'containers/Layout';
import WithLayout from 'containers/Layout';
import MainWrapper from 'containers/MainWrapper';
// import StqChart from 'containers/Chart/StqChart';

const StqChart = dynamic(() => import('containers/Chart/StqChart'), {
    ssr: false,
});

const PhoneLogin = dynamic(() => import('containers/PhoneLogin'), {
    ssr: false,
});

const IndexPage: NextPage<{}> = ({ ...props }) => {
    console.log('all props', props);
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
                <title>Home | Stoqey</title>
                <meta name="Description" content="Home | Stoqey" />
            </Head>

            {/* <PageTitle backdrop={false} title={'Beta'} /> */}

            <Container>
                <Block paddingTop={['0', '0', '0', '40px']}>
                    <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
                        <Cell span={[12, 12, 6]}>
                            <OrderBookContainer showCurrency={false} />
                        </Cell>
                        <Cell span={[12, 12, 6]}>
                            <StqChart />
                        </Cell>
                    </Grid>
                </Block>
            </Container>
        </>
    );
};

export default IndexPage;
