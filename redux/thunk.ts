// redux/userActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUserApi, fetchUsersApi, fetchUserByIdApi, updateUserApi, createUserApi  } from '../services/api.service';

// Fetch users
export const fetchUsers = createAsyncThunk('/users', async () => {
  const response = await fetchUsersApi();
  return response.data; 
});

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string) => {
  await deleteUserApi(userId);
  return userId;
});


// Fetch a single user by ID
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string) => {
    const response = await fetchUserByIdApi(userId);
    return response.data;
  }
);


// Update user details
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, updatedData }: { userId: string; updatedData: any }) => {
    await updateUserApi(userId, updatedData);
    return updatedData;
  }
);

// Create a new user
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: any) => {
    const response = await createUserApi(userData);
    return response.data;
  }
);