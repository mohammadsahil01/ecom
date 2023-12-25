import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginUser, checkAuth, createUser, signOutUser, updateUser } from './authAPI';

const initialState = {
  loggedInUserToken:null ,
  status: 'idle',
  error:null,
  userChecked:false
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userInfo,) => {
  
      const response = await createUser(userInfo);
    return response.data;
    
  }
);

export const signOutUserAuthAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await signOutUser();
    
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (userData,{rejectWithValue}) => {
    try{
    const response = await LoginUser(userData);
    return response.data;
    }
    catch(error){
    console.log(error,'invalid credentials');
    return rejectWithValue(error);
  }
  }
);

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});



export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(signOutUserAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutUserAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      });
     
  },
});


export const selectLoggedUser = (state)=>state.auth.loggedInUserToken
export const selectErrors = (state)=>state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;
