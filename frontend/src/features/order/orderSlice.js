import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrderPlaced:null
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await CreateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrderPlaced = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrderPlaced = action.payload
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrderPlaced;

export default orderSlice.reducer;
