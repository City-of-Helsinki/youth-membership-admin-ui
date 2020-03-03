export interface DataProviderParams {
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
  | 'DELETE_MANY';

// TODO: Replace this with better type from react-admin
export type MethodHandlersResponse = any;

export type MethodHandler = (
  params: DataProviderParams
) => Promise<MethodHandlersResponse>;

export type MethodHandlers = {
  [key in Resource]?: {
    [key in Method]?: MethodHandler;
  };
};
