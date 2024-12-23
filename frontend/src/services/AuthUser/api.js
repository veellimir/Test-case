import { api } from '../url.js'
import { HEADERS_AUTH } from '../headers.js'


export const register = (data) => api.post('auth/', data);
export const login = (credentials) => api.post('auth/token/', credentials);
export const logout = (authToken) => api.post('auth/logout/', {}, HEADERS_AUTH(authToken));