import React, { Fragment } from 'react';
import Image from '../UiElements/Image/Image';
import BannerBG from 'assets/images/bg/white_bg1.svg';
import BannerWrapper, { BgImageWrapper } from './bannerSection.style';
import Container from '../UiElements/Container/Container';
import { H2, Heading, Subtitle, Heading4 } from '../UiElements/Text/styled';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';

const BannerSection = (props: any) => {

  const ButtonGroup = () => (
    <Fragment>
      <Button
        kind={"primary"}
        size="large"
      >Get Started</Button>

      <Button
        kind={"tertiary"}
        size="large"
      >Download Whitepaper</Button>
    </Fragment>
  );

  return (
    <BannerWrapper id="banner_section">
      <BgImageWrapper>
        <Image url={BannerBG} alt="banner background" />
      </BgImageWrapper>

      <Container>
        <Block>
          <Heading>Accounts Payable Automation 80% Faster Bill Pay and AP</Heading>
          <Heading4>Agencies around the world are moving to the digital agencies. So, It is high time to introduce your agency digitaly.</Heading4>
          <ButtonGroup />
        </Block>
        <Block margin={"100px"}>
          <ButtonGroup />
        </Block>
      </Container>

    </BannerWrapper>
  );
};



// BannerSection.defaultProps = {
//   row: {
//     flexBox: true,
//     flexWrap: 'wrap',
//     ml: '-15px',
//     mr: '-15px',
//     alignItems: 'center',
//   },
//   col: {
//     pr: '15px',
//     pl: '15px',
//     width: ['100%', '100%', '100%', '60%', '65%'],
//   },
//   title: {
//     fontSize: ['26px', '34px', '42px', '42px', '47px'],
//     fontWeight: '700',
//     color: '#fff',
//     letterSpacing: '-0.025em',
//     mb: ['20px', '25px'],
//     lineHeight: '1.31',
//   },
//   description: {
//     fontSize: ['14px', '16px', '18px', '18px', '20px'],
//     color: '#fff',
//     lineHeight: '30px',
//     mb: '0',
//     maxWidth: '550px',
//   },
//   btnStyle: {
//     minWidth: ['120px', '156px'],
//     fontSize: '15px',
//     fontWeight: '700',
//     borderRadius: '6px',
//   },
//   outlineBtnStyle: {
//     minWidth: ['130px', '156px'],
//     fontSize: '16px',
//     fontWeight: '700',
//     color: '#fff',
//     p: '5px 10px',
//   },
// };

export default BannerSection;
