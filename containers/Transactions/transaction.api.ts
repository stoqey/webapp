import { ApolloClient } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { GET_MY_TRANSACTIONS, TransactionType } from '@stoqey/client-graphql';

export const getTransactionsPaginationApi = async ({
  args,
  client,
  err,
  done,
}: {
  args: { owner: string; limit: number; page: number; filter?: string };
  client: ApolloClient<any>;
  err?: (error: Error) => Promise<any>;
  done?: (data: any[]) => Promise<any>;
}) => {
  console.log('transactions are', JSON.stringify(args));

  try {
    const { data: dataResponse }: any = await client.query({
      query: GET_MY_TRANSACTIONS,
      variables: args,
      fetchPolicy: 'network-only',
    });

    if (!dataResponse) {
      throw new Error('error getting transactions data');
    }

    const { data }: { data?: TransactionType[] } = dataResponse;

    console.log(`data response transactions ${data && data.length}`);

    if (!isEmpty(data)) {
      //   Successful
      await done(data);
      return console.log(`transactions data is successful ${data && data.length}`);
    }
    throw new Error('error getting transactions data, please try again later');
  } catch (error) {
    console.error(error);
    await err(error);
  }
};
