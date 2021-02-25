import React from 'react';
import { CurrencyNumber } from '@/components/Currency/currencyNumber'
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS, AppEvents } from '@/lib/AppEvent';

export const CurrencyNumberContainer = () => {
    const defaultValue = AppEvents.Instance && AppEvents.Instance.getCurrency();
    const quote = useAppEvent(APPEVENTS.CURRENCY);
    return (<CurrencyNumber {...defaultValue} {...quote} />)
}