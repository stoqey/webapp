import { ApolloClient } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { ResType, ActionType, PortfolioType, GET_MY_PORTFOLIOS_PAGINATION, CLOSE_PORTFOLIO_MUTATION, START_PORTFOLIO_MUTATION, CREATE_ORDER_MUTATION, TradingStatusType, IOrderType, CANCEL_ORDER_MUTATION} from '@stoqey/client-graphql';
import AsyncStorageDB from '@/lib/AsyncStorageDB';

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
  // console.log('portfolios are', JSON.stringify(args));

  try {

    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, 'user.id', '');

    const argsToPass = {
      owner: userId,
      ...args,
    };
    
    const { data: dataResponse }: any = await client.mutate({
      mutation: CREATE_ORDER_MUTATION,
      variables: argsToPass,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error starting data');
    }

    const { data }: { data?: ResType } = dataResponse;

    // console.log(`data response starting portfolio ${JSON.stringify(data)}`);

    if (data.success) {
      //   Successful
      await success(true);
      return console.log(`starting portfolios is successful ${data && data}`);
    }

    if(data.message){
      const err = new Error(data.message);
      return await error(err);
    };
  
    throw new Error('error starting portfolios, please try again later');
  } catch (err) {
    console.error(err);
    await error(err);
  }
};

export const cancelOrderMutation = async ({
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
      mutation: CANCEL_ORDER_MUTATION,
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

