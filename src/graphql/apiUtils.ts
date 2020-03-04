import { QueryOptions, OperationVariables } from 'apollo-boost';
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
