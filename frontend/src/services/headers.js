export const HEADERS_AUTH = (token) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
});