import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Fetch all users
export const fetchUsersApi = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

// Fetch a single user by ID
export const fetchUserByIdApi = (userId: string) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
};

// Create a new user
export const createUserApi = (userData: any) => {
  return axios.post(`${API_BASE_URL}/users`, userData);
};

// Update a user by ID
export const updateUserApi = (userId: string, updatedData: any) => {
  return axios.put(`${API_BASE_URL}/users/${userId}`, updatedData);
};

// Delete a user by ID
export const deleteUserApi = (userId: string) => {
  return axios.delete(`${API_BASE_URL}/users/${userId}`);
};