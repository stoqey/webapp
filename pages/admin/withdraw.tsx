import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Grid, Cell } from "baseui/layout-grid";
import { Block } from "baseui/block";
import Container from "components/UiElements/Container/Container";
import FirebaseCrud from "containers/Admin";
import AdminMenu from "components/SideMenu/AdminMenu";

const TITLE = "Admin withdraw requests";
const SUB_TITLE =
	"Admin withdraw requests";

const FirebaseCRUD: NextPage<{}> = () => {
	return (
		<>
			<Head>
				<title>Stoqey Admin</title>
				<meta name="Description" content={SUB_TITLE} />
			</Head>

			<Container>
				<Block paddingTop={["0", "0", "0", "40px"]}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 3]}>
							<AdminMenu />
						</Cell>
						<Cell span={[12, 12, 9]}>
							<Block paddingTop={["10px", "7px", "30px", "0"]}>
								<FirebaseCrud />
							</Block>
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default FirebaseCRUD;
