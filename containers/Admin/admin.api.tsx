import { GET_ALL_USERS, UserType } from '@stoqey/client-graphql';
import { isEmpty } from 'lodash';

export const adminFetchUsers = async ({ args, client, error, success }) => {
  try {

    console.log("args are", args);
    const { data }: { data: { users: UserType[] } } = await client.query({
      query: GET_ALL_USERS,
      variables: {
        limit: 1000,
        ...args
      }
    });

    if (!isEmpty(data && data.users)) {
      success(data.users);
    }
    throw new Error("error getting users, please try again later")
  } catch (err) {
    error(err)
  }
};
