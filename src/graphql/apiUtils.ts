import { MutationOptions, OperationVariables, QueryOptions } from 'apollo-boost';
import { HttpError } from 'react-admin';

import client from './client';

export const queryHandler = async (
  queryOptions: QueryOptions<OperationVariables>
) => {
  try {
    const res = await client.query(queryOptions);
    return res;
  } catch (error) {
    throw new HttpError(error.message);
  }
};

export const mutateHandler = async (
  mutationOptions: MutationOptions<OperationVariables>
) => {
  try {
    return await client.mutate(mutationOptions);
  } catch (error) {
    console.log("ERROR", error);
    throw new HttpError(error.message);
  }
};
