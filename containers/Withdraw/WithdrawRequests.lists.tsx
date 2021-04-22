import React from 'react';
import WithdrawRequestItem from './WithdrawRequests.item';
import { WithdrawRequestType, StatusType } from '@stoqey/client-graphql';

const requests: WithdrawRequestType[] = [
    {
        id: "1",
        owner: "ceddy",
        amount: 1000,
        status: StatusType.SUCCESS,
    },
    {
        id: "2",
        owner: "ceddy",
        amount: 400,
        status: StatusType.PENDING,
    }
]

export const WithdrawRequestList = () => {
    return (
        <div>
            {requests.map((i) => <WithdrawRequestItem key={i.id} {...i} />)}
        </div>
    )
}