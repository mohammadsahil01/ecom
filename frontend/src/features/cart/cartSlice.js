import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemsFromCart, fetchProductByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  value:0,
  items:[],
  cartLoaded:false
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemsFromCartAsync = createAsyncThunk(
  'cart/deleteItemsFromCart',
  async (itemId) => {
    const response = await deleteItemsFromCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchProductByUserId();
    return response.data;
  }
);



export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = (action.payload);
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index] = (action.payload);
      })
      .addCase(deleteItemsFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemsFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      });
  },
});

export const { increment } = counterSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default counterSlice.reducer;
