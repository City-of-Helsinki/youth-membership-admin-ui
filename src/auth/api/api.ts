import client from '../../graphql/client';
import { hasPermissionQuery } from './queries';

export type RoleResponse = {
  data: {
    role: 'admin' | 'none';
  };
};

const getRole = async (token: string): Promise<RoleResponse> => {
  try {
    await client.query({
      query: hasPermissionQuery,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return {
      data: {
        role: 'admin',
      },
    };
  } catch (e) {
    return { data: { role: 'none' } };
  }
};

export { getRole };
