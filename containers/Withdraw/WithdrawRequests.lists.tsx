import React from 'react';
import WithdrawRequestItem from './WithdrawRequests.item';
import { WithdrawRequestType, StatusType } from '@stoqey/client-graphql';
import { getWithdrawRequestsPaginationApi } from './WithdrawRequest.api'
import { useApolloClient } from '@apollo/react-hooks';


export const WithdrawRequestList = () => {

    const [requests, setRequests] = React.useState<WithdrawRequestType[]>();

    const client = useApolloClient();

    const getDataApi = () => getWithdrawRequestsPaginationApi({
        client,
        args: {},
        error: async () => {

        },
        success: async (data) => setRequests(data)
    })


    return (
        <div>
            {requests.map((i, index) => <WithdrawRequestItem key={`${index}-${i.id}`} {...i} />)}
        </div>
    )
}