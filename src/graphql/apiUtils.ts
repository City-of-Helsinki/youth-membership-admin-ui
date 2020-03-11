import {
  MutationOptions,
  OperationVariables,
  QueryOptions,
} from 'apollo-boost';
import { HttpError } from 'react-admin';

import client from './client';

export const queryHandler = async (
  queryOptions: QueryOptions<OperationVariables>
) => {
  try {
    return await client.query(queryOptions);
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
    throw new HttpError(error.message);
  }
};
