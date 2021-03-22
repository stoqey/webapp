import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid';
import Sticky from 'react-stickynode';
import { Block } from 'baseui/block';
import Container from '../components/UiElements/Container/Container';
import PageTitle from '../components/UiElements/PageTitle/PageTitle';
import ScrollSpyMenu from '../components/UiElements/ScrollSpyMenu/ScrollSpyMenu';

import TermsPage from 'containers/Terms';

const Terms: NextPage<{}> = () => {

  return (
    <>
      <Head>
        <title>Terms and Conditions Stoqey</title>
        <meta name="Description" content="Terms and Conditions Stoqey" />
      </Head>

      <Container>
        <PageTitle
          title={"Terms and Conditions"}
          subtitle={`2021/01/01`}
          backdrop={false}
        />
        <TermsPage />
      </Container>
    </>
  );
};

export default Terms;
