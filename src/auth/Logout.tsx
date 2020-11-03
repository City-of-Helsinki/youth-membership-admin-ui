import { useEffect } from 'react';
import { useAuthProvider } from 'react-admin';

const Logout = () => {
  const authProvider = useAuthProvider();

  useEffect(() => {
    authProvider.logout();
  });
  return null;
};

export default Logout;
