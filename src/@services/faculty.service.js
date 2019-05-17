import { env } from "../@env";
import { authHeader, handleResponse } from '../@helpers';

const getAll = () => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/faculty`, requestOptions).then(handleResponse);
}

export const facultyService = {
  getAll,
}

