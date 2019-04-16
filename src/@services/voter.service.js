import { BehaviorSubject } from 'rxjs';

import { env } from "../@env";

import { authHeader, handleResponse } from '../@helpers';

const auth = (electoralEventPublickey, tokenAuth) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenAuth })
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/voter/auth`, requestOptions).then(handleResponse);
}

const currentVoterSubject = new BehaviorSubject(localStorage.getItem('currentVoter'));

const access = (electoralEventPublickey, tokenAccess) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenAccess })
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/voter/access`, requestOptions)
    .then(handleResponse)
    .then(response => {
      localStorage.setItem('currentVoter', tokenAccess);
      currentVoterSubject.next(tokenAccess);
      return response;
    });
}

const removeTokenAccess = () => {
  localStorage.removeItem('currentVoter');
  currentVoterSubject.next(null);
}

const login = (electoralEventPublickey, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/voter/login`, requestOptions)
    .then(response => {
      if (response.headers.has('token')) {
        localStorage.setItem('currentVoter', response.headers.get('token'));
      }
      return response;
    })
    .then(handleResponse);
}

const vote = (electoralEventPublickey, elections, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ elections, password })
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/voter/vote`, requestOptions).then(handleResponse);
}


export const voterService = {
  vote,
  auth,
  login,
  access,
  removeTokenAccess,
  currentVoter: currentVoterSubject.asObservable(),
  get currentVoterValue() { return currentVoterSubject.value }
}