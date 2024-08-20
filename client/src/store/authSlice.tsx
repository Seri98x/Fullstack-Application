// authslice.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk<string, { username: string; password: string }>(
  'auth/loginUser',
  async (userCreds) => {
    const response = await axios.post('http://localhost:5000/login', userCreds);
    const accessToken = response.data.access_token;
    sessionStorage.setItem('token', JSON.stringify(accessToken));
    return accessToken;
  }
);

interface AuthState {
  token: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('Login failed:', action.error);
      });
  },
});


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
