import { api } from '../url.js'
import { HEADERS_AUTH } from '../headers.js'


export const getProfile = (token) => api.get('users/', HEADERS_AUTH(token));

export const postProfile = (token, profileData) => {
    return api.post('users/', profileData, HEADERS_AUTH(token));
};

export const patchProfile = (token, id, ProfileUpdateData) => {
    return api.patch(`users/${id}/`, ProfileUpdateData, HEADERS_AUTH(token));
};
