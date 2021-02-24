import { styled } from "baseui"
import BannerBG from 'assets/images/bg/main_bg.svg';

export const BannerWrapper = styled('section', ({ $theme }) => ({
  width: '100%',
  paddingTop: '210px',
  // paddingBottom: '400px',
  backgroundImage: `url(${BannerBG})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top-center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '@media (max-width: 1440px)': {
    paddingBottom: '305px'
  },
  '@media (max-width: 990px)': {
    paddingTop: '150px',
    paddingBottom: '210px'
  },
  '@media (max-width: 768px)': {
    backgroundImage: 'none',
    backgroundColor: '#6d4efe'
  },

  'only screen and (max-width: 480px)': {
    paddingTop: '130px',
    paddingBottom: '110px'
  }

}));


export const BgImageWrapper = styled('section', ({ $theme }) => ({
  position: 'absolute',
  left: 0,
  width: '100%',
  bottom: 0,
  'img': {
    width: '100%',
    height: 'auto',
    display: 'block',
    margin: '-2px -1px',
    '@media (max-width: 480px)': {
      margin: ' -2px -1px',
    }
  }
}));


export default BannerWrapper;
