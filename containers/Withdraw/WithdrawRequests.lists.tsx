import React, { useEffect } from 'react';
import WithdrawRequestItem from './WithdrawRequests.item';
import { WithdrawRequestType, StatusType } from '@stoqey/client-graphql';
import { getWithdrawRequestsPaginationApi } from './WithdrawRequest.api'
import { useApolloClient } from '@apollo/client';


export const WithdrawRequestList = () => {

    const client = useApolloClient();
    const [requests, setRequests] = React.useState<WithdrawRequestType[]>();

    const getDataApi = () => getWithdrawRequestsPaginationApi({
        client,
        // args: {},
        error: async () => {

        },
        success: async (data) => setRequests(data)
    })

    useEffect(() => { getDataApi() }, [])


    return (
        <div>
            {(requests || []).map((i, index) => <WithdrawRequestItem key={`${index}-${i.id}`} {...i} />)}
        </div>
    )
}