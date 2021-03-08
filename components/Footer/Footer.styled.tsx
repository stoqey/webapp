import { styled } from 'baseui';

const FooterWrapper = styled('footer', {
  width: '100%',
  paddingTop: '50px',
  paddingBottom: '50px'
});

export const StoqeyWords = styled('p', ({ $theme }) => ({
  color: $theme.colors.primary,
  ...$theme.typography.font850,
  fontFamily: "Helvetica-Bold, Helvetica",
}));

export const StatusWrapper = styled('div', ({ $theme }) => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'space-between',
  color: $theme.colors.contentSecondary,
  padding: '5px',
  border: `1px solid ${$theme.colors.backgroundTertiary}`,
}));

export const StatusText = styled('div', ({ $theme }) => ({
  color: $theme.colors.primary,
}));

export const Text = styled('p', ({ $theme }) => ({
  width: '100%',
  margin: '0',
  textAlign: 'center',
  color: $theme.colors.contentSecondary,
  padding: '27px 0 25px',
  borderTop: `1px solid ${$theme.colors.backgroundTertiary}`,
  ...$theme.typography.font100,
}));

export default FooterWrapper;
