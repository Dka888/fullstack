import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../utils/Product';
import { Basket } from '../utils/Basket';
import axios from 'axios';
import { ProductsInBasket } from '../utils/Basket';

interface BasketState {
  items: Basket[];
  isLoadingBasket: boolean;
}
const activeUser = localStorage.getItem('loggedInUser');
const { _id } = activeUser ? JSON.parse(activeUser) : '';

const initialState: BasketState = {
  items: [],
  isLoadingBasket: false,
};

export const getBasket = createAsyncThunk('basket/getBasket', async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3333/basket/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
})

export const addToBasket = createAsyncThunk('basket/addToBasket', async (product: Product) => {
  try {
    if (activeUser) {
      const newBasket = { userId: _id, productId: product._id };
      const response = await axios.post('http://localhost:3333/basket/add', newBasket);
      const newData = response.data;
      return newData;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const removeFromBasket = createAsyncThunk('basket/removeFromBasket', async (productId: string) => {
  try {
    if (activeUser) {
      const updatingBasket = { userId: _id, productId };
      const response = await axios.patch(`http://localhost:3333/basket/${_id}`, updatingBasket);
      const updatedBasket = response.data;
      return updatedBasket
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  });

export const removeAllFromBasket = createAsyncThunk('basket/removeAllFromBasket', async () => {
   try {
      const response = await axios.patch(`http://localhost:3333/basket/all/${_id}`);
      return response.data;
   } catch(e) {
    throw e;
   }
});

export const deleteItem = createAsyncThunk('basket/delete', async (_id: string) => {
  try {
    const response = await axios.delete(`http://localhost:3333/basket/${_id}`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
})

export const changeQuantities = createAsyncThunk('basket/changeQuantity', async (product: ProductsInBasket) => {
   
  try {
      const {quantity} = product;
      const updatingBasket = { userId: _id, quantity, _id: product._id };
     
      const response = await axios.patch(`http://localhost:3333/basket/quantity/${_id}`, updatingBasket);
      const updatedBasket = response.data;
     console.log(response)
      return updatedBasket
  } catch (e) {
    console.log(e);
    throw e;
  }
});

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBasket.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoadingBasket = false;
      })
      .addCase(getBasket.pending, (state, action) => {
  
        state.isLoadingBasket = true;
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.items = action.payload; 
        state.isLoadingBasket = false;
      })
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        state.items = action.payload;
           state.isLoadingBasket = false;
      })
      .addCase(removeFromBasket.pending, (state) => {
        
           state.isLoadingBasket = true;
      })
      .addCase(changeQuantities.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoadingBasket = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = action.payload;
           state.isLoadingBasket = false;
      })
      .addCase(removeAllFromBasket.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoadingBasket = false;
      });
  },
});

export const { actions: basketActions, reducer: basketReducer } = basketSlice;