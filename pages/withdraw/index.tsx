import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { useForm } from 'react-hook-form';
import Container from 'components/UiElements/Container/Container';
import PortfolioMenu from 'components/SideMenu/PortfolioMenu';
import { ButtonGroup } from 'components/PageStyles/Settings.styled';
import WithdrawRequestMenu from '@/components/SideMenu/WithdrawRequestMenu';
import { FaStripe } from 'react-icons/fa';
import { StripeConnectForm } from 'containers/Stripe/StripeConnectForm';
import { WithdrawForm } from 'containers/Withdraw/WithdrawRequest.form';
import PaymentMethodEditor from 'containers/PaymentMethod/PaymentMethod.editor';
import { PaymentMethodType } from '@stoqey/client-graphql';
// import { WithdrawRequestList } from 'containers/Withdraw/WithdrawRequests.lists';

type FormData = {
	amount: string;
};

const Withdraw: NextPage<{}> = () => {

	const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(null);

	return (
		<>
			<Head>
				<title>Withdraw | Stoqey.</title>
				<meta name="Description" content="Withdraw | Stoqey" />
			</Head>

			<Container>
				<Block paddingTop={['0', '0', '0', '40px']}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 3]}>
							<WithdrawRequestMenu />
						</Cell>
						<Cell span={[12, 12, 5]}>
							{/* <WithdrawRequestList /> */}
							<WithdrawForm paymentMethod={paymentMethod} />
						</Cell>
						<Cell span={[12, 12, 3]}>
							<PaymentMethodEditor onChangeMethod={(method) => setPaymentMethod(method)} />
						</Cell>

					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Withdraw;
