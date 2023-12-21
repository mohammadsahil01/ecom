import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOutUser, updateUser } from './authAPI';

const initialState = {
  loggedInUserToken:null ,
  status: 'idle',
  error:null,
  signIn:false
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

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userData,{rejectWithValue}) => {
    try{
    const response = await checkUser(userData);
    return response.data;
    }
    catch(error){
    console.log(error,'invalid credentials');
    return rejectWithValue(error);
  }
  }
);




export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.signIn = true
   
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(signOutUserAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutUserAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      });
     
  },
});


export const selectLoggedUser = (state)=>state.auth.loggedInUserToken
export const selectErrors = (state)=>state.auth.error;
export const selectSignIn = (state)=>state.auth.signIn;
export const selectuserStatus = (state)=>state.auth.status;

export default authSlice.reducer;
