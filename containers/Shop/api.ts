import { ApolloClient } from '@apollo/react-hooks';
import { LoginResponseType, PROCESS_PAYPAL_MUTATION, ResType } from '@stoqey/client-graphql';

export interface PhoneProcessArgs {
  amount: number;
  owner: string;
  orderId: string;
}

export const processPayment = async ({
  args,
  client,
  error,
  success,
}: {
  args: PhoneProcessArgs;
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: any) => Promise<any>;
}) => {
  console.log('processPayment', JSON.stringify(args));

  try {
    const { data: dataResponse }: any = await client.mutate({
      mutation: PROCESS_PAYPAL_MUTATION,
      variables: args,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error processing payment data');
    }

    const { data }: { data?: ResType } = dataResponse;

    // console.log('payment processing response', JSON.stringify(data));

    if (data.success) {
      //   Successful
      // console.log('payment processing successful', JSON.stringify(data));
      await success(data);
      return;
    }

    throw new Error('error processing payment, please try again later');
  } catch (err) {
    console.error(err);
    await error(err);
  }
};
