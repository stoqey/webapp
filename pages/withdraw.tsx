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
import FundsMenu from '@/components/SideMenu/FundsMenu';
import { FaStripe } from 'react-icons/fa';
import { StripeConnectForm } from 'containers/Stripe/StripeConnectForm';

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
				<meta name="Description" content="Stoqey withdraw money page" />
			</Head>

			<Container>
				<Block paddingTop={['0', '0', '0', '40px']}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 3]}>
							<FundsMenu />
						</Cell>
						<Cell span={[12, 12, 9]}>
							<Block paddingTop={['10px', '10px', '20px', '0']} justifyContent="center" display="flex">
								<StripeConnectForm userId={null}>
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
														width: '75%',
														...$theme.typography.font450,
													};
												},
											},
										}}
									>
										{"Get paid with "}	<FaStripe style={{ marginLeft: 10 }} size={60} />
									</Button>
								</StripeConnectForm>


							</Block>
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Withdraw;
