import { styled } from 'baseui';

export const Title = styled('h3', ({ $theme }) => ({
	...$theme.typography.font450,
	color: $theme.colors.primaryA,
	marginBottom: $theme.sizing.scale500,
}));

export const Subtitle = styled('p', ({ $theme }) => ({
	...$theme.typography.font200,
	color: $theme.colors.contentTertiary,
}));

export const H1Title = styled('h1', ({ $theme }) => ({
	...$theme.typography.font950,
	color: $theme.colors.primaryA,
}));