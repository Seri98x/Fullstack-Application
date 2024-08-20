// authslice.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk<string, { username: string; password: string }>(
  'auth/loginUser',
  async (userCreds) => {
    const response = await axios.post('https://seri98.pythonanywhere.com/login', userCreds);
    const accessToken = response.data.access_token;
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
        sessionStorage.setItem('token', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (action) => {
        console.error('Login failed:', action);
      });
  },
});


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
