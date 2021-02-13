import { ApolloClient } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { GET_MY_TRANSACTIONS, TransactionType } from '@stoqey/client-graphql';
import AsyncStorageDB from '@/lib/AsyncStorageDB';

export const getTransactionsPaginationApi = async ({
  args,
  client,
  error,
  success,
}: {
  args: { limit?: number; page?: number; filter?: string };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: any[]) => Promise<any>;
}) => {
  console.log('transactions are', JSON.stringify(args));

  try {

    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, 'user.id', '');

    const argsToPass = {
      limit: 100,
      owner: userId,
      ...args,
    };
    
    const { data: dataResponse }: any = await client.query({
      query: GET_MY_TRANSACTIONS,
      variables: argsToPass,
      fetchPolicy: 'network-only',
    });

    if (!dataResponse) {
      throw new Error('error getting transactions data');
    }

    const { data }: { data?: TransactionType[] } = dataResponse;

    console.log(`data response transactions ${data && data.length}`);

    if (!isEmpty(data)) {
      //   Successful
      await success(data);
      return console.log(`transactions data is successful ${data && data.length}`);
    }
    throw new Error('error getting transactions data, please try again later');
  } catch (err) {
    console.error(err);
    await error(err);
  }
};
