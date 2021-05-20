import { ApolloClient } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { ResType, ActionType, PortfolioType, GET_PAYMENT_METHODS, TradingStatusType } from '@stoqey/client-graphql';
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