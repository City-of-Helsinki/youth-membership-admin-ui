import axios, { AxiosResponse } from 'axios';

const url = `${process.env.REACT_APP_OIDC_AUTHORITY}api-tokens/`;

export default async function(accessToken: string) {
  const response: AxiosResponse = await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data['https://api.hel.fi/auth/helsinkiprofile'];
}
