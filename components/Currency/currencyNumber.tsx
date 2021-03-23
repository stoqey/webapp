import React from 'react';
import { styled } from 'baseui';
import { H2, H3, Paragraph1 } from 'baseui/typography';
import { niceDec } from 'utils/number';

interface Props {
	close: number;
	change: number;
	changePtc: number;
};
export const CurrencyNumber = (props: Props) => {
	const { close, change, changePtc } = props;
	const changeStyleColor = changePtc >= 0 ? 'green' : 'red';

	const changeSign = changePtc >= 0 ? '+' : '-';

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div style={{ textAlign: 'center', padding: '10px' }}>
				<div style={{ display: 'flex' }}>
					<H3>${niceDec(close)}</H3>
					<Paragraph1>USD</Paragraph1>
				</div>
				 
				<p style={{ color: changeStyleColor }}>{changeSign}{niceDec(change)} ({niceDec(changePtc)}%)</p>
			</div>
		</div>
	)
}