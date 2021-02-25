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

	const changeStyleColor = change >= 0 ? 'green' : 'red';

	const changeSign = change >= 0 ? '+' : '-';

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div style={{ textAlign: 'center', padding: '4px' }}>

				{/*  */}
				<div style={{ display: 'flex' }}>
					<H3>${niceDec(close)}</H3>
					<Paragraph1 style={{ fontSize: '12px' }}>USD</Paragraph1>
				</div>

				{change && (
					<p style={{ color: changeStyleColor }}>{changeSign}{niceDec(change)} ({niceDec(changePtc)}%)</p>
				)}

			</div>
		</div>
	)
}