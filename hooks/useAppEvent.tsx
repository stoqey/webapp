import React, { useState, useEffect } from 'react';
import { MarketDataType } from '@stoqey/client-graphql'
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { AppEvents, APPEVENTS } from '../lib/AppEvent';

export function useAppEvent(eventName: string): MarketDataType | any {
    const events = AppEvents.Instance;

    const [dbData, setData] = useState<MarketDataType>(null);

    useEffect(() => {
        const handle = (data) => {
            setData(data)
        };

        events.on(eventName, handle);
        return () => {
            events.off(eventName, handle);
        }
    }, []);

    return !dbData ? {} as any : dbData;

}