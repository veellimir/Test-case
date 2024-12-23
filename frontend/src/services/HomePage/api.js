import { api } from '../url.js'
import { HEADERS_AUTH } from '../headers.js'


export const getTasks = (token) => api.get('tasks/', HEADERS_AUTH(token));

export const getMyTasks = (token) => api.get('tasks/my_tasks/', HEADERS_AUTH(token));

export const createTask = (token, data) => api.post('tasks/', data, HEADERS_AUTH(token));

export const patchTasks = (token, id, data) => api.patch(`tasks/${id}/`, data, HEADERS_AUTH(token));

export const deleteTask = (token, id) => api.delete(`tasks/${id}/`, HEADERS_AUTH(token));