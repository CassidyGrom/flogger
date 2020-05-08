import axios from 'axios';

export const getAllUsers = function () {
  return axios.get('/api/users');
};

// route to get logged in user's info (needs the token)
export const getMe = function (token) {
  return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
};

// get a user by their username, not being used in the app just showing how it could work
export const getUser = function (username) {
  return axios.get(`/api/users/${username}`);
};

export const createUser = function (userData) {
  return axios.post('/api/users', userData);
};

export const loginUser = function (userData) {
  return axios.post('/api/users/login', userData);
};

// save journal entry for a logged in user
export const saveEntries = function (journalData, token) {
  return axios.put('/api/users', journalData, { headers: { authorization: `Bearer ${token}` } });
};
// remove saved journal entry for a logged in user
export const deleteEntries = function (journalId, token) {
  return axios.delete(`/api/users/journals/${journalId}`, { headers: { authorization: `Bearer ${token}` } });
};


export const getEmotionList = function (emotionData) {
  return axios.get('/api/emotions');
};