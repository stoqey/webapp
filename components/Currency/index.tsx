import React from 'react';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';

import { Subtitle, H1Title } from './styles';
import Button from '../button';
import { niceDec } from 'utils/number';

interface Props {
    amount: number;
    change?: number;
    name: string;
    RightButton?: React.FunctionComponent
    LeftButton?: React.FunctionComponent
};

/**
 * CurrencyPill
 * @param props 
 */
export const CurrencyPill = (props: Props) => {
    const { amount, change, name, RightButton, LeftButton } = props;

    return (
        <Cell span={[12, 12, 12]}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                {RightButton && <RightButton />}

                {/* Amount and wallet name */}
                <Block padding="5px">
                    <p style={{ display: 'flex', justifyContent: 'center' }}>
                        <H1Title>{niceDec(amount)}</H1Title>
                        {change && <h2 style={{ color: change > 0 ? "#3AA76D" : "red" }}>{change}</h2>}
                    </p>
                    <Subtitle style={{ textAlign: 'center' }}>{name}</Subtitle>
                </Block>

                {LeftButton && <LeftButton />}

            </div>



        </Cell>
    )
}

export default CurrencyPill;