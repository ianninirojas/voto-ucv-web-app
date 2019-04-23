import { BehaviorSubject } from 'rxjs';

import { env } from "../@env";

import * as jwt from "jsonwebtoken";

import { authHeader, handleResponse } from '../@helpers';

const currentVoterSubject = new BehaviorSubject(localStorage.getItem('currentVoter'));

const createCurrentVoter = (token) => {
  localStorage.setItem('currentVoter', token);
  currentVoterSubject.next(token);
}

const auth = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/voter/auth`, requestOptions).then(handleResponse);
}

const access = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/voter/access`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

const login = (electoralEventPublickey, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/voter/login`, requestOptions)
    .then(handleResponse);
}

const vote = (electoralEventPublickey, candidates, password) => {
  console.log('vote-service')
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidates, password })
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/voter/vote`, requestOptions).then(handleResponse);
}

const removeCurrentVoter = () => {
  localStorage.removeItem('currentVoter');
  currentVoterSubject.next(null);
}

const refreshToken = (token) => {
  localStorage.setItem('currentVoter', token);
  currentVoterSubject.next(token);
}

const getTypeCode = () => {
  if (currentVoterSubject.value)
    return jwt.decode(currentVoterSubject.value).typeCode;
  else
    return '';
}

export const voterService = {
  createCurrentVoter,
  auth,
  access,
  login,
  vote,
  removeCurrentVoter,
  refreshToken,
  getTypeCode,
  currentVoter: currentVoterSubject.asObservable(),
  get currentVoterValue() { return currentVoterSubject.value }
}