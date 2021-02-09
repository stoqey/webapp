import { ApolloClient } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { PortfolioType, GET_MY_PORTFOLIOS_PAGINATION } from '@stoqey/client-graphql';
import AsyncStorageDB from '@/lib/AsyncStorageDB';

export const getPortfoliosPaginationApi = async ({
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
  console.log('portfolios are', JSON.stringify(args));

  try {

    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, 'user.id', '');

    const argsToPass = {
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
    await error(err);
  }
};
