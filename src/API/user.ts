import axios from 'axios';

export const login = async (username: string, password: string) => {
  return await axios
    .post('http://localhost:5000/api/user/login/', {
      username: username,
      password: password,
    })
    .then((response) => {
      return response.data;
    });
};

export const register = async (username: string, password: string) => {
  return await axios
    .post('http://localhost:5000/api/user/registerAccount/', {
      username: username,
      password: password,
    })
    .then((response) => {
      return response.data;
    });
};
