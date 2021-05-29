import { ApolloClient } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { ResType, ActionType, PortfolioType, GET_PAYMENT_METHODS, CREATE_PAYMENTMETHOD_MUTATION, TradingStatusType, PaymentMethodType, DELETE_PAYMENTMETHOD_MUTATION } from '@stoqey/client-graphql';
import AsyncStorageDB from '@/lib/AsyncStorageDB';

export const getPaymentMethodsPaginationApi = async ({
  args,
  client,
  error,
  success,
}: {
  args?: { limit?: number; page?: number; filter?: string };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: PortfolioType[]) => Promise<any>;
}) => {
  // console.log('paymentmethods are', JSON.stringify(args));

  try {

    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, 'user.id', '');

    const argsToPass = {
      filter: TradingStatusType.LIVE,
      limit: 100,
      owner: userId,
      ...args,
    };
    
    const { data: dataResponse }: any = await client.query({
      query: GET_PAYMENT_METHODS,
      variables: argsToPass,
      fetchPolicy: 'network-only',
    });

    if (!dataResponse) {
      throw new Error('error getting portfolio data');
    }

    const { data }: { data?: PortfolioType[] } = dataResponse;

    // console.log(`data response paymentmethods ${data && data.length}`);

    if (!isEmpty(data)) {
      //   Successful
      await success(data);
      return console.log(`paymentmethods data is successful ${data && data.length}`);
    }
    throw new Error('error getting paymentmethods data, please try again later');
  } catch (err) {
    console.error(err);
    error && await error(err);
  }
};

export const createUpdatePaymentMethodMutation = async ({
  args,
  client,
  error,
  success,
}: {
  args?: Partial<PaymentMethodType>;
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: any) => Promise<any>;
}) => {
  console.log("add payment method", JSON.stringify(args));

  try {
    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, "user.id", "");

    const argsToPass = {
      owner: userId,
      ...args
    };

    const { data: dataResponse }: any = await client.mutate({
      mutation: CREATE_PAYMENTMETHOD_MUTATION,
      variables: { args: argsToPass},
      fetchPolicy: "no-cache",
    });

    if (!dataResponse) {
      throw new Error("error adding payment method data");
    }

    const { data }: { data?: ResType } = dataResponse;
    if (data.success) {
      await success(data);
      return;
    }

    throw new Error("error adding payment method, please try again later");
  } catch (err) {
    console.error(err);
    await error(err);
  }
};

export const deletePaymentMethodMutation = async ({
  args,
  client,
  error,
  success,
}: {
  args: { id: string };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: any) => Promise<any>;
}) => {

  try {
    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, "user.id", "");

    const argsToPass = {
      owner: userId,
      id: args.id
    };

    const { data: dataResponse }: any = await client.mutate({
      mutation: DELETE_PAYMENTMETHOD_MUTATION,
      variables: argsToPass,
      fetchPolicy: "no-cache",
    });

    if (!dataResponse) {
      throw new Error("error deleting payment method");
    }

    const { data }: { data?: ResType } = dataResponse;
    if (data.success) {
      await success(data);
      return;
    }

    throw new Error("error deleting payment method, please try again later");
  } catch (err) {
    console.error(err);
    await error(err);
  }
};
