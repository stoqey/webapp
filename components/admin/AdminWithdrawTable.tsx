import React, { Fragment } from 'react';
import { StyledTable, StyledBodyCell } from 'baseui/table-grid';
import IconButton from 'components/UiElements/IconButton/IconButton';
import { StyledTableHeadAlt } from 'components/PageStyles/Apps.styled';
import { Tag } from 'baseui/tag';
import { AiOutlineEdit } from 'react-icons/ai';
import { StatusType, UserType, WithdrawRequestType } from '@stoqey/client-graphql';

interface Props {
  data: WithdrawRequestType[]
  confirmWithdraw: (withdrawReq: WithdrawRequestType, newAction: StatusType) => void;
};

export function AdminWithdrawTable({ data, confirmWithdraw }: Props) {
  return data.length !== 0 ? (
    <StyledTable $gridTemplateColumns="130px 200px auto max-content">
      <StyledTableHeadAlt>Owner</StyledTableHeadAlt>
      <StyledTableHeadAlt>Created at</StyledTableHeadAlt>
      <StyledTableHeadAlt>Amount</StyledTableHeadAlt>
      <StyledTableHeadAlt>Confirm</StyledTableHeadAlt>
      {/* <StyledTableHeadAlt>-----</StyledTableHeadAlt> */}

      {data.map((item, index) => {
        const striped = index % 2 === 0;
        return (
          <Fragment key={index}>
            <StyledBodyCell $striped={striped}>{(item.owner || '').slice(0, 6)}</StyledBodyCell>

            <StyledBodyCell $striped={striped}> {item.createdAt}</StyledBodyCell>

            <StyledBodyCell $striped={striped}> {item.amount}</StyledBodyCell>

            {/* Confirm button */}
            <StyledBodyCell $striped={striped}>
              <p>
                <IconButton onClick={() => confirmWithdraw(item, null)}>
                  <AiOutlineEdit />
                </IconButton>
              </p>
            </StyledBodyCell>
          </Fragment>
        );
      })}
    </StyledTable>
  ) : (
    <div>No Data Found</div>
  );
}

export default AdminWithdrawTable;