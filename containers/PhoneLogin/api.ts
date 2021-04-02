import { ApolloClient } from '@apollo/react-hooks';
import { LoginResponseType, PHONE_LOGIN_MUTATION } from '@stoqey/client-graphql';

export interface PhoneAuthCreds {
  phone: string;
  firebaseToken: string;
  createNew: boolean;
}

export const phoneLoginApi = async ({
  args,
  client,
  error,
  success,
}: {
  args: PhoneAuthCreds;
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: LoginResponseType) => Promise<any>;
}) => {
  // console.log('phoneLoginApi', JSON.stringify(args));

  try {
    const { data: dataResponse }: any = await client.mutate({
      mutation: PHONE_LOGIN_MUTATION,
      variables: args,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error getting login data');
    }

    const { data }: { data?: LoginResponseType } = dataResponse;

    // console.log('loginApi response', JSON.stringify(data));

    if (data.success) {
      //   Successful
      // console.log('Login successful', JSON.stringify(data));
      await success(data);
      return;
    }

    throw new Error('error logging in, please try again later');
  } catch (err) {
    console.error('error logging in with phone', err);
    await error(err);
  }
};
