import React from 'react';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';

import { Subtitle, H1Title } from './styles';


interface Props {
    amount: number;
    change: number;
    name: string;
};

/**
 * CurrencyPill
 * @param props 
 */
export const CurrencyPill = (props: Props) => {
    const { amount, change, name } = props;

    return (
        <Cell span={[12, 12, 12]}>
            <Block display="block" justifyContent="center" width="100%">
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                    <H1Title>{amount}</H1Title>
                    {change && <h2 style={{ color: change > 0? "#3AA76D" : "red" }}>{change}</h2>}
                </p>
                <Subtitle style={{ textAlign: 'center' }}>{name}</Subtitle>
            </Block>
        </Cell>
    )
}

export default CurrencyPill;