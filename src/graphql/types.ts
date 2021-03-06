export interface DataProviderParams {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [index: string]: any;
}

export type MethodHandlerParams = DataProviderParams;

export type Resource = 'youthProfiles';

export type Method =
  | 'LIST'
  | 'ONE'
  | 'MANY'
  | 'MANY_REFERENCE'
  | 'CREATE'
  | 'UPDATE'
  | 'UPDATE_MANY'
  | 'DELETE'
  | 'DELETE_MANY'
  | 'RENEW';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type MethodHandlersResponse = any;

export type MethodHandler = (
  params: DataProviderParams
) => Promise<MethodHandlersResponse>;

export type MethodHandlers = {
  [key in Resource]?: {
    [key in Method]?: MethodHandler;
  };
};
