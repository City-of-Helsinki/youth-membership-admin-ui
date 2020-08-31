import {
  MethodHandlers,
  Method,
  Resource,
  DataProviderParams as Params,
} from './types';
import {
  createYouthProfile,
  getYouthProfiles,
  getYouthProfile,
  renewYouthProfile,
  updateYouthProfile,
} from '../pages/youthProfiles/api/YouthApi';
import { getRole } from '../auth/api/api';

const METHOD_HANDLERS: MethodHandlers = {
  youthProfiles: {
    ONE: getYouthProfile,
    LIST: getYouthProfiles,
    CREATE: createYouthProfile,
    RENEW: renewYouthProfile,
    UPDATE: updateYouthProfile,
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
  getOne: async (resource: Resource, params: Params) => {
    const data = await runHandler('ONE', resource, params);
    return { data };
  },
  getList: async (resource: Resource, params: Params) => {
    const data = await runHandler('LIST', resource, params);
    return { data: data, total: data.length };
  },
  create: async (resource: Resource, params: Params) => {
    const data = await runHandler('CREATE', resource, params);
    return { data };
  },
  update: async (resource: Resource, params: Params) => {
    if (params.method === 'renew') {
      const renew = await runHandler('RENEW', resource, params);
      if (renew) {
        const data = await runHandler('UPDATE', resource, params);
        return { data };
      }
    } else {
      const data = await runHandler('UPDATE', resource, params);
      return { data };
    }
  },
  getRole,
};

export default dataProvider;
