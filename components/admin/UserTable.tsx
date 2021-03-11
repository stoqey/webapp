import React, { Fragment } from 'react';
import { StyledTable, StyledBodyCell } from 'baseui/table-grid';
import IconButton from 'components/UiElements/IconButton/IconButton';
import { StyledTableHeadAlt } from 'components/PageStyles/Apps.styled';
import { Tag } from 'baseui/tag';
import { AiOutlineEdit } from 'react-icons/ai';
import { UserType } from '@stoqey/client-graphql';

interface Props {
  data: UserType[]
  onUpdate: Function
  onUpdateUserBalance: Function;
  onDelete?: Function
};

export default function UserTable({ data, onUpdateUserBalance }: Props) {
  return data.length !== 0 ? (
    <StyledTable $gridTemplateColumns="130px 200px auto max-content max-content">
      <StyledTableHeadAlt>ID</StyledTableHeadAlt>
      <StyledTableHeadAlt>Name</StyledTableHeadAlt>
      <StyledTableHeadAlt>Email</StyledTableHeadAlt>
      <StyledTableHeadAlt>Phone</StyledTableHeadAlt>
      <StyledTableHeadAlt>Bal</StyledTableHeadAlt>
      {/* <StyledTableHeadAlt>-----</StyledTableHeadAlt> */}

      {data.map((item, index) => {
        const striped = index % 2 === 0;
        return (
          <Fragment key={index}>
            <StyledBodyCell $striped={striped}>{(item.id || '').slice(0, 6)}</StyledBodyCell>
            <StyledBodyCell $striped={striped}> {(item.firstname || '').slice(0, 10)}</StyledBodyCell>
            <StyledBodyCell $striped={striped}> {item.email}</StyledBodyCell>
            <StyledBodyCell $striped={striped}> {item.phone}</StyledBodyCell>
            <StyledBodyCell $striped={striped}>
              <p>
                {item.balance}
                <IconButton onClick={() => onUpdateUserBalance(item)}>
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
