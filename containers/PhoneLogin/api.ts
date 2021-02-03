import { ApolloClient } from '@apollo/react-hooks';
import { LoginResponseType, PHONE_LOGIN_MUTATION } from '@stoqey/client-graphql';

interface LoginCreds {
  phone: string;
  firebaseToken: string;
  createNew: boolean;
}

export const phoneLoginApi = async ({
  creds,
  client,
  error,
  success,
}: {
  creds: LoginCreds;
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: LoginResponseType) => Promise<any>;
}) => {
  console.log('phoneLoginApi', JSON.stringify(creds));

  try {
    const { data: dataResponse }: any = await client.mutate({
      mutation: PHONE_LOGIN_MUTATION,
      variables: creds,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error getting login data');
    }

    const { data }: { data?: LoginResponseType } = dataResponse;

    console.log('loginApi response', JSON.stringify(data));

    if (data.success) {
      //   Successful
      await success(data);
      return console.log('Login successful', JSON.stringify(data));
    }

    throw new Error('error logging in, please try again later');
  } catch (err) {
    console.error(err);
    await error(err);
  }
};
