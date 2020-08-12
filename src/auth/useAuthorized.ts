import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { usePermissions, useAuthState } from 'react-admin';

function useAuthorized(): boolean {
  const history = useHistory();
  const { loaded: loadedAuthentication } = useAuthState();
  const { loaded: loadedPermissions, permissions } = usePermissions();

  const ready =
    loadedAuthentication &&
    loadedPermissions &&
    ['admin', 'none'].includes(permissions);

  useEffect(() => {
    if (ready && permissions === 'none') {
      history.push('/not-authorized');
    }
  }, [history, permissions, ready]);

  return !ready;
}

export default useAuthorized;
