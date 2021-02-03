import { ApolloClient } from '@apollo/react-hooks';
import { log } from '../../config';
import { LoginResponseType, LOGIN_MUTATION } from '@stoqey/client-graphql';

interface LoginCreds {
  password: string;
  email: string;
}

export const loginApi = async ({
  creds,
  client,
  errorFunction,
  successFunction,
}: {
  creds: LoginCreds;
  client: ApolloClient<any>;
  errorFunction?: (error: Error) => Promise<any>;
  successFunction?: (data: LoginResponseType) => Promise<any>;
}) => {
  log.info('loginApi', JSON.stringify(creds));

  try {
    const { data: dataResponse }: any = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: creds,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error getting login data');
    }

    const { data }: { data?: LoginResponseType } = dataResponse;

    log.info('loginApi response', JSON.stringify(data));

    if (data.success) {
      //   Successful
      await successFunction(data);
      return log.info('Login successful', JSON.stringify(data));
    }

    throw new Error('error logging in, please try again later');
  } catch (error) {
    log.error('Error logging in', error);
    await errorFunction(error);
  }
};
