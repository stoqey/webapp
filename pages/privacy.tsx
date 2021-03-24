import { NextPage } from 'next';
import Head from 'next/head';
import Container from '../components/UiElements/Container/Container';
import PageTitle from '../components/UiElements/PageTitle/PageTitle';
 
import PrivacyPage from 'containers/Privacy';

const Privacy: NextPage<{}> = () => {

  const subText = `
    At Stoqey, we take privacy and security seriously. This  Privacy Policy outlines
    how Stoqey Financial LLC and its affiliates (collectively, the “Company,” Stoqey,” “we,”
    “our,” or “us”) process the information we collect about you through our websites, mobile apps,
    and other online services (collectively, the “Services”) and when you otherwise interact with us,
    such as through our customer service channels.
  `
  return (
    <>
      <Head>
        <title>Privacy Policy | Stoqey</title>
        <meta name="Description" content="Privacy Policy | Stoqey" />
      </Head>

      <Container>
        <PageTitle
          title={"Privacy Policy"}
          subtitle={`Effective: 2021/01/01 ${subText}`}
          backdrop={false}
        />
        <PrivacyPage />
      </Container>
    </>
  );
};

export default Privacy;
