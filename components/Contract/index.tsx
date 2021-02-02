import React from 'react';
import { AiFillCloseSquare, AiOutlineEdit } from 'react-icons/ai';
import { Grab } from 'baseui/icon';
import { Block } from 'baseui/block';
import {
  ContractItemWrapper,
  ContractItem,
  EditButton,
  RemoveButton,
} from './Contract.styled';
import { Checkbox } from 'baseui/checkbox';


function ContractComponent({ index, order }: any) {
  return (
    <ContractItem>
      <ContractItemWrapper>
        {order}
      </ContractItemWrapper>
    </ContractItem>
  );
}

export default ContractComponent;
