import { styled } from 'baseui';

export const Heading = styled('h2', ({ $theme }) => ({
	...$theme.typography.font950,
	color: $theme.colors.primaryA,
	marginTop: 0,
	marginBottom: '1rem',
	fontWeight: 'bold',
	fontSize: '47px',
	lineHeight: '1.31',
}));

export const Heading3 = styled('h3', ({ $theme }) => ({
	...$theme.typography.font950,
	color: $theme.colors.primaryA,
	marginTop: 0,
	marginBottom: '1rem',
	fontWeight: 'bold',
	fontSize: '47px',
	lineHeight: '1.31',
}));

export const Heading4 = styled('h4', ({ $theme }) => ({
	...$theme.typography.font450,
	color: $theme.colors.primaryA,
	margin: '0.5rem',
	fontWeight: 'bold',
	fontSize: '27px',
}));

export const H2 = styled('h2', ({ $theme }) => ({
	...$theme.typography.font950,
	color: $theme.colors.primaryA,
	marginBottom: $theme.sizing.scale600,

	lineHeight: '1.31',

	'@media only screen and (max-width: 1135px)': {
		...$theme.typography.font850,
	},
	'@media only screen and (max-width: 767px)': {
		...$theme.typography.font750,
		marginBottom: $theme.sizing.scale500,
	},
	'@media only screen and (max-width: 480px)': {
		...$theme.typography.font650,
		marginBottom: $theme.sizing.scale400,
	},
}));

export const Subtitle = styled('p', ({ $theme }) => ({
	...$theme.typography.font200,
	color: $theme.colors.contentSecondary,
}));
