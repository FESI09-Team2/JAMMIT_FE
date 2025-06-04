export const fetchWithAuth = async (
  url: string,
  getToken: () => string | null,
  options: RequestInit = {},
) => {
  const token = getToken();
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    headers,
    ...options,
  });
};
