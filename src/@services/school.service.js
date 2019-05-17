import { env } from "../@env";
import { authHeader, handleResponse } from '../@helpers';

const getAll = (facultyId) => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/faculty/${facultyId}/school`, requestOptions).then(handleResponse);
}

export const schoolService = {
  getAll,
}

