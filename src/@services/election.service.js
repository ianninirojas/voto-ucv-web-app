import { env } from "../@env";
import { handleResponse } from '../@helpers';

const getAll = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/election`, requestOptions).then(handleResponse);
}

const getResult = (electoralEventPublickey, election) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ election })
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/election/result`, requestOptions).then(handleResponse);
}

export const electionService = {
  getAll,
  getResult
}

