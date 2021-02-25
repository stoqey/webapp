import { ApolloClient } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { ResType, ActionType, PortfolioType, GET_MY_PORTFOLIOS_PAGINATION, CLOSE_PORTFOLIO_MUTATION, START_PORTFOLIO_MUTATION, TradingStatusType, IOrderType } from '@stoqey/client-graphql';
import AsyncStorageDB from '@/lib/AsyncStorageDB';

export const getPortfoliosPaginationApi = async ({
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
  console.log('portfolios are', JSON.stringify(args));

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
      query: GET_MY_PORTFOLIOS_PAGINATION,
      variables: argsToPass,
      fetchPolicy: 'network-only',
    });

    if (!dataResponse) {
      throw new Error('error getting portfolio data');
    }

    const { data }: { data?: PortfolioType[] } = dataResponse;

    console.log(`data response portfolios ${data && data.length}`);

    if (!isEmpty(data)) {
      //   Successful
      await success(data);
      return console.log(`portfolios data is successful ${data && data.length}`);
    }
    throw new Error('error getting portfolios data, please try again later');
  } catch (err) {
    console.error(err);
    error && await error(err);
  }
};


export const startPortfolioMutation = async ({
  args,
  client,
  error,
  success,
}: {
  args: { size: number; action: ActionType; };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (success: boolean) => Promise<any>;
}) => {
  console.log('portfolios are', JSON.stringify(args));

  try {

    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, 'user.id', '');

    const argsToPass = {
      owner: userId,
      ...args,
    };
    
    const { data: dataResponse }: any = await client.mutate({
      mutation: START_PORTFOLIO_MUTATION,
      variables: argsToPass,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error starting data');
    }

    const { data }: { data?: ResType } = dataResponse;

    console.log(`data response starting portfolio ${JSON.stringify(data)}`);

    if (data.success) {
      //   Successful
      await success(true);
      return console.log(`starting portfolios is successful ${data && data}`);
    }
    throw new Error('error starting portfolios, please try again later');
  } catch (err) {
    console.error(err);
    await error(err);
  }
};

export const createOrderMutation = async ({
  args,
  client,
  error,
  success,
}: {
  args: { 
    size: number; 
    action: ActionType;
    type?: IOrderType;
    price?: number;
    stopPrice?: number;
   };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (success: boolean) => Promise<any>;
}) => {
  console.log('portfolios are', JSON.stringify(args));

  try {

    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, 'user.id', '');

    const argsToPass = {
      owner: userId,
      ...args,
    };
    
    const { data: dataResponse }: any = await client.mutate({
      mutation: START_PORTFOLIO_MUTATION,
      variables: argsToPass,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error starting data');
    }

    const { data }: { data?: ResType } = dataResponse;

    console.log(`data response starting portfolio ${JSON.stringify(data)}`);

    if (data.success) {
      //   Successful
      await success(true);
      return console.log(`starting portfolios is successful ${data && data}`);
    }
    throw new Error('error starting portfolios, please try again later');
  } catch (err) {
    console.error(err);
    await error(err);
  }
};

export const closePortfolioMutation = async ({
  args,
  client,
  error,
  success,
}: {
  args: { id: string };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (success: boolean) => Promise<any>;
}) => {
  console.log('portfolios are', JSON.stringify(args));

  try {

    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, 'user.id', '');

    const argsToPass = {
      owner: userId,
      ...args,
    };
    
    const { data: dataResponse }: any = await client.mutate({
      mutation: CLOSE_PORTFOLIO_MUTATION,
      variables: argsToPass,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error closing portfolio');
    }

    const { data }: { data?: ResType } = dataResponse;

    console.log(`data response closing portfolio ${JSON.stringify(data)}`);

    if (data.success) {
      //   Successful
      await success(true);
      return console.log(`closing portfolios is successful ${data && data}`);
    }
    throw new Error('error closing portfolios, please try again later');
  } catch (err) {
    console.error(err);
    await error(err);
  }
};

