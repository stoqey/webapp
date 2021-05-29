import React, { Fragment } from 'react';
import moment from 'moment';
import { NextPage } from 'next';
import { Block } from 'baseui/block';
import { StyledTable } from 'baseui/table-grid';
import { StyledTableHeadAlt, StyledTableBodyCell } from 'components/PageStyles/Apps.styled';
import { getWithdrawRequestsPaginationApi } from './WithdrawRequest.api'
import { useApolloClient } from '@apollo/client';
import { isEmpty } from 'lodash';
import { WithdrawRequestType } from '@stoqey/client-graphql';

const WithdrawRequestsTable: NextPage<{}> = () => {
    const client = useApolloClient();

    const [requests, setRequests] = React.useState<WithdrawRequestType[]>([])

    const getDataApi = () => getWithdrawRequestsPaginationApi({
        client,
        args: {},
        error: async () => {

        },
        success: async (data) => setRequests(data)
    })

    React.useEffect(() => { getDataApi() }, []);

    return (
        <>
            <Block
                paddingTop={['10px', '20px', '30px', '0']}
                overrides={{ Block: { style: { minHeight: '150px' } } }}
            >
                <StyledTable $gridTemplateColumns="auto auto auto">
                    <StyledTableHeadAlt>Date</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Amount</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Status</StyledTableHeadAlt>
                    {/* <StyledTableHeadAlt>Receipt</StyledTableHeadAlt> */}
                    {requests.map((item: WithdrawRequestType, index) => {
                        const striped = index % 2 === 0;
                        const createdAt = item && item.createdAt;
                        return (
                            <Fragment key={index}>
                                {/* <StyledBodyCell $striped={striped}>
									<SvgIcon
										src={require('assets/images/check.svg?include')}
									/>{' '}
								</StyledBodyCell> */}
                                <StyledTableBodyCell $striped={striped} $isCenter>
                                    {!isEmpty(createdAt) ? moment(createdAt).fromNow() : ""}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell $striped={striped} $isCenter>
                                    {item.amount}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell $striped={striped} $isCenter>
                                    {item.status}
                                </StyledTableBodyCell>
                                {/* <StyledBodyCell $striped={striped}>
									<TextButton onClick={() => alert('click')}>
										<MdCloudDownload size="1.2rem" color="#545454" />
									</TextButton>
								</StyledBodyCell> */}
                            </Fragment>
                        );
                    })}
                </StyledTable>
            </Block>
        </>
    );
};

export default WithdrawRequestsTable;
