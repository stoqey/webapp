import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid';
import Sticky from 'react-stickynode';
import { Block } from 'baseui/block';
import Container from '../components/UiElements/Container/Container';
import PageTitle from '../components/UiElements/PageTitle/PageTitle';
import ScrollSpyMenu from '../components/UiElements/ScrollSpyMenu/ScrollSpyMenu';

import termsPageData from '../data/termsPage';
import PrivacyPage from 'containers/Privacy';

const Privacy: NextPage<{}> = () => {
  const { title, date, content } = termsPageData;

  const menuItems: string[] = [];
  content.forEach((item) => {
    menuItems.push(item.title);
  });

  return (
    <>
      <Head>
        <title>Terms and Conditions Stoqey</title>
        <meta name="Description" content="Terms and Conditions Stoqey" />
      </Head>

      <Container>
        <PageTitle
          title={title}
          subtitle={`Last update: ${date}`}
          backdrop={false}
        />
        <PrivacyPage />
      </Container>
    </>
  );
};

export default Privacy;
