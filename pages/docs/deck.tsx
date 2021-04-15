import { NextPage } from 'next';
import Head from 'next/head';
import Container from 'components/UiElements/Container/Container';
import PageTitle from 'components/UiElements/PageTitle/PageTitle';
import { Block } from 'baseui/block';


const PitchDeck: NextPage<{}> = () => {

  return (
    <>
      <Head>
        <title>Pitch Deck | Stoqey</title>

      </Head>

      <Container>
        <PageTitle
          title={"Stoqey Pitch Deck"}
          subtitle={"Updated: 2021/04/14"}
          backdrop={false}
          style={{ textAlign: "center" }}
        />
        <Block height="90vh">
          {/* @ts-ignore */}
          <iframe src="https://slides.com/patrickmuhire/deck-3c2aa1/embed" width="100%" height="100%" scrolling="no" frameBorder="0" webkitllowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </Block>

        {/* <iframe
          width={"100%"}
          height="100%"
          src="https://vgcache.s3.amazonaws.com/iframes/deck.html"
        /> */}
      </Container>
    </>
  );
};

export default PitchDeck;
