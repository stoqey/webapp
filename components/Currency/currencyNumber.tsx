import React from 'react';
import { styled } from 'baseui';
import { H2 } from 'baseui/typography';
import { niceDec } from 'utils/number';

interface Props {
   close: number;
   change: number;
   changePtc: number;
};
export const CurrencyNumber = (props: Props) => {
	const { close, change, changePtc } = props;

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div style={{ textAlign: 'center', padding: '4px' }}>

				{/*  */}
				<div style={{ display: 'flex' }}>
					<H2>${niceDec(close)}</H2>
					<p style={{ fontSize: '12px' }}>USD</p>
				</div>

				<p style={{ color: 'red' }}>-0.51 (0.40%)</p>
			</div>
		</div>
	)
}