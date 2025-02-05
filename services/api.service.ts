import axios from 'axios';
import { USERS } from './api.constant';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Fetch users from API
export const fetchUsersApi = () => {
  return axios.get(`${API_BASE_URL}${USERS}`);
};

// Delete a user by ID
export const deleteUserApi = (userId: string) => {
  return axios.delete(`${API_BASE_URL}${USERS}/${userId}`);
};

// Fetch single user from API
export const fetchUserByIdApi = (userId: string) => {
  return axios.get(`http://localhost:3000/api/users/${userId}`);
};

// update single user from API
export const updateUserApi = (userId: string, updatedData: any) => {
  return axios.put(`http://localhost:3000/api/users/${userId}`, updatedData);
};

// create new user from API
export const createUserApi = (userData: any) => {
  return axios.post(`http://localhost:3000/api/users`, userData);
};