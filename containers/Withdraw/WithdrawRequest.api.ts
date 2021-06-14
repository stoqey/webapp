import { ApolloClient } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import {
  ResType,
  CREATE_WITHDRAWREQUEST_MUTATION,
  CANCEL_WITHDRAWREQUEST_MUTATION,
  ADMIN_GET_ALL_WITHDRAW_REQUESTS,
  GET_WITHDRAW_REQUESTS,
  ActionType,
  WithdrawRequestType,
  StatusType,
} from "@stoqey/client-graphql";
import AsyncStorageDB from "@/lib/AsyncStorageDB";


export const adminGetWithdrawRequestsPaginationApi = async ({
  args,
  client,
  error,
  success,
}: {
  args?: { limit?: number; filter?: StatusType };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: WithdrawRequestType[]) => Promise<any>;
}) => {

  try {

    const argsToPass = {
      limit: 1000,
      ...args,
    };

    const { data: dataResponse }: any = await client.query({
      query: ADMIN_GET_ALL_WITHDRAW_REQUESTS,
      variables: argsToPass,
      fetchPolicy: "network-only",
    });

    if (!dataResponse) {
      throw new Error("error getting withdrawrequests data");
    }

    const { data }: { data?: WithdrawRequestType[] } = dataResponse;

    console.log(`data response withdrawrequests ${data && data.length}`);

    if (!isEmpty(data)) {
      //   Successful
      await success(data);
      return console.log(
        `withdraw requests data is successful ${data && data.length}`
      );
    }
    throw new Error("error getting withdraw requests data, please try again later");
  } catch (err) {
    console.error(err);
    error && (await error(err));
  }
};

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
  args?: Partial<WithdrawRequestType> & { paymentMethod?: string };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: any) => Promise<any>;
}) => {
  console.log("processPayment", JSON.stringify(args));

  try {
    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, "user.id", "");

    const argsToPass = {
      ...args,
      owner: userId,
      amount: +((args && args.amount) || 0),
    };

    const { data: dataResponse }: any = await client.mutate({
      mutation: CREATE_WITHDRAWREQUEST_MUTATION,
      variables: { args: argsToPass },
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

export const cancelWithdrawRequestMutation = async ({
  args,
  client,
  error,
  success,
}: {
  args: { id: string };
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: any) => Promise<any>;
}) => {

  try {
    const user = await AsyncStorageDB.getAuthItem();
    const userId = _get(user, "user.id", "");

    const argsToPass = {
      owner: userId,
      id: args.id
    };

    const { data: dataResponse }: any = await client.mutate({
      mutation: CANCEL_WITHDRAWREQUEST_MUTATION,
      variables: argsToPass,
      fetchPolicy: "no-cache",
    });

    if (!dataResponse) {
      throw new Error("error canceling withdraw request");
    }

    const { data }: { data?: ResType } = dataResponse;
    if (data.success) {
      await success(data);
      return;
    }

    throw new Error("error canceling withdraw request, please try again later");
  } catch (err) {
    console.error(err);
    await error(err);
  }
};


// TODO accept/reject
// TODO delete
