import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchLoggedInUserOrders, signOutUser } from './userAPI';
import { updateUser } from '../user/userAPI';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

const initialState = {
  userInfo:null,
  userOrders:[],
  value: 0,
  status: 'idle',
  userchecked:false
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const signOutUserAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    
    const response = await signOutUser();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setUserChecked: (state) => {
      state.userchecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
        state.userchecked = true;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userchecked = true;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = null;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;

export const selectUserInfo = (state) => state.user.userInfo;

export const selectUserChecked = (state) => state.user.userchecked;

export const {setUserChecked} =  userSlice.actions;




export default userSlice.reducer;
