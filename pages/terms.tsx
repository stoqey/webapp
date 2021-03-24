import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid';
import Sticky from 'react-stickynode';
import { Block } from 'baseui/block';
import Container from '../components/UiElements/Container/Container';
import PageTitle from '../components/UiElements/PageTitle/PageTitle';
import ScrollSpyMenu from '../components/UiElements/ScrollSpyMenu/ScrollSpyMenu';

import TermsPage from 'containers/Terms';

const TNC = () => {
  return (
    <div>
      <p>
        Stoqey Financial LLC (“Stoqey Financial”), a wholly-owned subsidiary of Stoqey Markets,
        Inc. (“Stoqey Markets”), is a registered broker-dealer and member of FINRA and SIPC that provides
        online and mobile application-based discount stock brokerage services to self-directed investors.
      </p>
      <br/>
      <p>
        These Terms and Conditions are in addition to any other agreements between you and Stoqey Financial
        and Stoqey Markets (collectively, “Stoqey”), including any customer or account agreements and
        any other agreements that govern your use of software, products, goods, services, content, tools, and
        information provided by Stoqey.
      </p>
    </div>
  )
}
const Terms: NextPage<{}> = () => {

  return (
    <>
      <Head>
        <title>Terms and Conditions | Stoqey</title>
        <meta name="Description" content="Terms and Conditions | Stoqey" />
      </Head>

      <Container>
        <PageTitle
          title={"Terms and Conditions"}
          // @ts-ignore
          subtitle={<TNC />}
          backdrop={false}
        />
        <TermsPage />
      </Container>
    </>
  );
};

export default Terms;
