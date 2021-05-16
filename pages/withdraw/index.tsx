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
// import { WithdrawRequestList } from 'containers/Withdraw/WithdrawRequests.lists';

type FormData = {
	amount: string;
};

const Withdraw: NextPage<{}> = () => {

	const { register, setValue, handleSubmit, reset, errors } = useForm<
		FormData
	>();
	const [feedback, setFeedback] = useState(false);
	const [state, setState] = useState<FormData>({
		amount: '',
	});

	const handleOnChange = (e: any) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const handleOnSubmit = handleSubmit((data) => {
		// if (state.newPassword === state.confirmPassword) {
		setFeedback(false);
		console.log('Form data: ', data);
		alert(JSON.stringify(data, null, 4));
		// } else {
		// 	setFeedback(true);
		// }
	});

	const handleOnReset = () => {
		setState({ amount: '' });
		reset();
	};

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
						<Cell span={[12, 12, 3]}>
							{/* <WithdrawRequestList /> */}
							<WithdrawForm />
						</Cell>
						<Cell span={[12, 12, 3]}>
							<Block justifyContent="center" display="flex">
								<PaymentMethodEditor />
								{/* <StripeConnectForm userId={null}>
									<Button
										type="button"
										size="default"
										shape="pill"
										onClick={() => {

										}}
										overrides={{
											BaseButton: {
												style: ({ $theme }) => {
													return {
														width: '100%',
														...$theme.typography.font350,
													};
												},
											},
										}}
									>
										{"Get paid with "}	<FaStripe style={{ marginLeft: 10 }} size={40} />
									</Button>
								</StripeConnectForm> */}



							</Block>
						</Cell>
						
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Withdraw;
