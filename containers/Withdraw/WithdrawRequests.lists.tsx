import React from 'react';
import WithdrawRequestItem from './WithdrawRequests.item';
import { WithdrawRequestType, StatusType } from '@stoqey/client-graphql';

const requests: WithdrawRequestType[] = [
    {
        id: "0",
        owner: "ceddy",
        amount: 1000,
        status: StatusType.DRAFT,
        notes: "Draft"
    },
    // {
    //     id: "1",
    //     owner: "ceddy",
    //     amount: 1000,
    //     status: StatusType.SUCCESS,
    //     notes: "Success"
    // },
    // {
    //     id: "2",
    //     owner: "ceddy",
    //     amount: 400,
    //     status: StatusType.PENDING,
    //     notes: "Pending"
    // },
    // {
    //     id: "3",
    //     owner: "ceddy",
    //     amount: 400,
    //     status: StatusType.FAIL,
    //     notes: "Failed"
    // },
    // {
    //     id: "4",
    //     owner: "ceddy",
    //     amount: 400,
    //     status: StatusType.REJECTED,
    //     notes: "Rejected"
    // },
    // {
    //     id: "5",
    //     owner: "ceddy",
    //     amount: 400,
    //     status: StatusType.PROCESSING,
    //     notes: "Processing"
    // }
]

export const WithdrawRequestList = () => {
    return (
        <div>
            {requests.map((i, index) => <WithdrawRequestItem key={`${index}-${i.id}`} {...i} />)}
        </div>
    )
}