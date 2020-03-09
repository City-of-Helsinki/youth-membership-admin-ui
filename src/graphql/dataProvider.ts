import {
  MethodHandlers,
  Method,
  Resource,
  DataProviderParams as Params,
} from './types';
import {
  createYouthProfile,
  getYouthProfiles,
} from '../pages/youthProfiles/api/YouthApi';

const METHOD_HANDLERS: MethodHandlers = {
  youthProfiles: {
    LIST: getYouthProfiles,
    CREATE: createYouthProfile,
  },
};

const runHandler = async (
  method: Method,
  resource: Resource,
  params: Params
) => {
  const handlers = METHOD_HANDLERS[resource];
  if (!handlers) {
    throw new Error(`Invalid resource "${resource}".`);
  }

  const handler = handlers[method];
  if (!handler) {
    throw new Error(
      `Method "${method}" for resource "${resource}" is not implemented.`
    );
  }

  return handler(params);
};

const dataProvider = {
  getList: async (resource: Resource, params: Params) => {
    const data = await runHandler('LIST', resource, params);
    return { data: data, total: data.length };
  },
  create: async (resource: Resource, params: Params) => {
    const data = await runHandler('CREATE', resource, params);
    return { data };
  },
};

export default dataProvider;
