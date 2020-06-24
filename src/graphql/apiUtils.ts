import {
  MutationOptions,
  OperationVariables,
  QueryOptions,
} from 'apollo-boost';
import { HttpError } from 'react-admin';
import * as Sentry from '@sentry/browser';

import client from './client';

export const queryHandler = async (
  queryOptions: QueryOptions<OperationVariables>
) => {
  try {
    return await client.query(queryOptions);
  } catch (error) {
    if (
      error.message ===
      'GraphQL error: Invalid Authorization header. JWT has expired.'
    ) {
      // JWT has expired. Probably because user has been offline. Remove old apiToken to trigger logout
      localStorage.removeItem('apiToken');
    } else if (
      error.graphQLErrors[0].extensions.code === 'PERMISSION_DENIED_ERROR'
    ) {
      console.error('Permission denied');
    } else {
      console.error(error);
      Sentry.captureException(error);
    }
    throw new HttpError(error.message);
  }
};

export const mutateHandler = async (
  mutationOptions: MutationOptions<OperationVariables>
) => {
  try {
    return await client.mutate(mutationOptions);
  } catch (error) {
    Sentry.captureException(error);
    throw new HttpError(error.message);
  }
};
