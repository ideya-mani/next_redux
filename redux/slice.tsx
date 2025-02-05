import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchUserById, updateUser, createUser } from './thunk';

interface InitialState {
  users: any[];
  selectedUser: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      // Fetch a single user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user';
      })

      // Update user details
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.selectedUser) {
          state.selectedUser = { ...state.selectedUser, ...action.payload };
        }
      });
  },
});

export const { clearSelectedUser } = userReducer.actions;
export default userReducer.reducer;
