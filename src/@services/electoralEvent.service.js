import { env } from "../@env";
import { handleResponse } from '../@helpers';

const get = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}`, requestOptions).then(handleResponse);
}

export const electoralEventService = {
  get
}