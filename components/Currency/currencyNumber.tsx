import React from 'react';
import { H3, Paragraph1 } from 'baseui/typography';
import { niceDec } from 'utils/number';
import { getTradeColor } from 'utils/colors';

interface Props {
	close: number;
	change: number;
	changePct: number;
};
export const CurrencyNumber = (props: Props) => {
	const { close, change, changePct } = props;
	const changeStyleColor = getTradeColor(changePct);

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div style={{ textAlign: 'center', padding: '10px' }}>
				<div style={{ display: 'flex' }}>
					<H3>{niceDec(close)}</H3>
					<Paragraph1>USD</Paragraph1>
				</div>

				<p style={{ color: changeStyleColor }}>{niceDec(change)} ({niceDec(changePct)}%)</p>
			</div>
		</div>
	)
}