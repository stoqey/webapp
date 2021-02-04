import React from 'react';
import { useRouter } from 'next/router';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import CartProduct from '../../components/UiElements/CartProduct/CartProduct';
import SvgIcon from '../../components/UiElements/SvgIcon/SvgIcon';
import {
  Header,
  Title,
  Price,
  Message,
  Strong,
} from '../../components/PageStyles/Checkout.styled';
import { calcCartItemsTotal } from '../../contexts/cart/cart.utils';
import { useCartDispatch } from '../../contexts/cart/cart.provider';
import { FaDonate } from 'react-icons/fa';

type CartType = {
  products: {
    id?: string;
    thumbnail?: string;
    name?: string;
    quantity?: string;
    price?: string;
    color?: any;
  }[];
};

const CurrencyCart = ({ products }: CartType) => {
  const totalPrice = calcCartItemsTotal(products);
  const dispatch = useCartDispatch();
  const router = useRouter();
  return (
    <>
      <Header>
        <Title>Amount to invest</Title>
        <Price>Total: $ {totalPrice}</Price>
      </Header>
      <>
        <CartProduct
          thumbUrl={'https://storage.googleapis.com/stqnetwork.appspot.com/symbols/STQ.png'}
          title={'STQ'}
          price={'100'}
          quantity={`Qty`}
          color={'red'}
          removable={true}

        />
      </>
      <Block
        marginTop={['30px', '40px']}
        paddingTop="25px"
        paddingRight="25px"
        paddingBottom="25px"
        paddingLeft="25px"
        overrides={{
          Block: {
            style: ({ $theme }) => {
              return {
                display: 'flex',
                alignItems: 'center',
                backgroundColor: $theme.colors.backgroundSecondary,
              };
            },
          },
        }}
      >
        <FaDonate />
        <Message>
          <Strong>Instant purchase</Strong> on this order
        </Message>
      </Block>
    </>
  );
};

export default CurrencyCart;
