import React from 'react';
import { Resource } from 'react-admin';
import { ResourceProps } from 'ra-core';

import useAuthorized from '../../useAuthorized';

const ProtectedResource = (props: ResourceProps) => {
  useAuthorized();

  return <Resource {...props} />;
};

export default ProtectedResource;
