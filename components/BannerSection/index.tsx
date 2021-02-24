import React, { Fragment } from 'react';
import Image from '../UiElements/Image/Image';
import BannerBG from 'assets/images/bg/white_bg1.svg';
import BannerWrapper, { BgImageWrapper } from './bannerSection.style';
import Box from '../UiElements/Box';
import Heading from '../UiElements/Heading';
import Text from '../UiElements/Text';
import Container from '../UiElements/Container/Container';
import FeatureBlock from '../FeatureBlock';

const BannerSection = (props: any) => {
  const {
    row = {
      flexBox: true,
      flexWrap: 'wrap',
      ml: '-15px',
      mr: '-15px',
      alignItems: 'center',
    },
    col = {
      pr: '15px',
      pl: '15px',
      width: ['100%', '100%', '100%', '60%', '65%'],
    },
    title = {
      fontSize: ['26px', '34px', '42px', '42px', '47px'],
      fontWeight: '900',
      color: '#fff',
      letterSpacing: '-0.025em',
      mb: ['20px', '25px'],
      lineHeight: '1.31',
    },
    description = {
      fontSize: ['14px', '16px', '18px', '18px', '20px'],
      color: '#fff',
      lineHeight: '30px',
      mb: '0',
      maxWidth: '550px',
    },
    btnStyle = {
      minWidth: ['120px', '156px'],
      fontSize: '15px',
      fontWeight: '700',
      borderRadius: '6px',
    },
    outlineBtnStyle = {
      minWidth: ['130px', '156px'],
      fontSize: '16px',
      fontWeight: '700',
      color: '#fff',
      p: '5px 10px',
    },
  } = props;


  return (
    <BannerWrapper id="banner_section">
      <BgImageWrapper>
        <Image url={BannerBG} alt="banner background" />
      </BgImageWrapper>

      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <FeatureBlock
              title={
                <Heading
                  content="Accounts Payable Automation 80% Faster Bill Pay and AP"
                  {...title}
                />
              }
              description={
                <Text
                  content="Agencies around the world are moving to the digital agencies. So, It is high time to introduce your agency digitaly."
                  {...description}
                />
              }
            // button={<ButtonGroup />}
            />

            <FeatureBlock
              title={
                <Heading
                  content="Accounts Payable Automation 80% Faster Bill Pay and AP"
                  {...title}
                />
              }
              description={
                <Text
                  content="Agencies around the world are moving to the digital agencies. So, It is high time to introduce your agency digitaly."
                  {...description}
                />
              }
            // button={<ButtonGroup />}
            />

            

        
            {/* <FeatureBlock button={<ShareButtonGroup />} /> */}
          </Box>
        </Box>
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
