import { ApolloClient } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import {
  ResType,
  CREATE_WITHDRAWREQUEST_MUTATION,
  GET_WITHDRAW_REQUESTS,
  ActionType,
  WithdrawRequestType,
} from "@stoqey/client-graphql";
import AsyncStorageDB from "@/lib/AsyncStorageDB";

export const getWithdrawRequestsPaginationApi = async ({
  args,
  client,
  error,
  success,
}: {
  args?: { limit?: number; page?: number; filter?: string };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: WithdrawRequestType[]) => Promise<any>;
}) => {
  // console.log('portfolios are', JSON.stringify(args));

  try {
    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, "user.id", "");

    const argsToPass = {
      // filter: TradingStatusType.LIVE,
      limit: 1000,
      owner: userId,
      ...args,
    };

    const { data: dataResponse }: any = await client.query({
      query: GET_WITHDRAW_REQUESTS,
      variables: argsToPass,
      fetchPolicy: "network-only",
    });

    if (!dataResponse) {
      throw new Error("error getting portfolio data");
    }

    const { data }: { data?: WithdrawRequestType[] } = dataResponse;

    console.log(`data response portfolios ${data && data.length}`);

    if (!isEmpty(data)) {
      //   Successful
      await success(data);
      return console.log(
        `portfolios data is successful ${data && data.length}`
      );
    }
    throw new Error("error getting portfolios data, please try again later");
  } catch (err) {
    console.error(err);
    error && (await error(err));
  }
};

export const createUpdateWithdrawRequestMutation = async ({
  args,
  client,
  error,
  success,
}: {
  args?: Partial<WithdrawRequestType>;
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: any) => Promise<any>;
}) => {
  console.log("processPayment", JSON.stringify(args));

  try {
    const { data: dataResponse }: any = await client.mutate({
      mutation: CREATE_WITHDRAWREQUEST_MUTATION,
      variables: { args },
      fetchPolicy: "no-cache",
    });

    if (!dataResponse) {
      throw new Error("error processing payment data");
    }

    const { data }: { data?: ResType } = dataResponse;
    if (data.success) {
      await success(data);
      return;
    }

    throw new Error("error processing payment, please try again later");
  } catch (err) {
    console.error(err);
    await error(err);
  }
};

// TODO accept/reject
// TODO delete
