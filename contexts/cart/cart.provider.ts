import { createCtxWithReducer } from '../context.utils';
import cartReducer, { initialState } from './cart.reducer';
const [useCartState, useCartDispatch, CartProvider] = createCtxWithReducer(
  cartReducer,
  initialState
);

export { useCartState, useCartDispatch, CartProvider };