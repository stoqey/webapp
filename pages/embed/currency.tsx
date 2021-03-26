import React, { useState } from 'react';
import { NextPage } from 'next';
import { CurrencyNumberContainer } from 'containers/Currency/CurrencyNumber';

const EmbedCurrency: NextPage<{}> = () => {
    return (
        <>
            <CurrencyNumberContainer />
        </>
    );
};

export default EmbedCurrency;
