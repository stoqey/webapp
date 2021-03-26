import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Grid, Cell } from "baseui/layout-grid";
import { Block } from "baseui/block";
import Container from "components/UiElements/Container/Container";
import AdminMenu from "components/SideMenu/AdminMenu";
import AdminOrderBook from "containers/Admin/Order";

const FirebaseCRUD: NextPage<{}> = () => {
	return (
		<>
			<Head>
				<title>Stoqey Admin OrderBook</title>
				<meta name="Description" content={"Stoqey Admin OrderBook"} />
			</Head>

			<Container>
				<Block paddingTop={["0", "0", "0", "40px"]}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 3]}>
							<AdminMenu />
						</Cell>
						<Cell span={[12, 12, 9]}>
							<Block paddingTop={["10px", "7px", "30px", "0"]}>
								<AdminOrderBook />
							</Block>
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default FirebaseCRUD;
