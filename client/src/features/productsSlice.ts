import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../utils/Product';
import axios from 'axios';


interface ProductState {
    products: Product[];
    loading: boolean;
}

const initialState: ProductState = {
    products: [],
    loading: false,
};


export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const data = axios.get('http://localhost:3333/products');
    const prods = (await data).data as Product[];
    return prods || [];
});

export const editProduct = createAsyncThunk('products/editProduct', async (productItem: Product) => {
    const {_id, rating, click} = productItem;
    try {
       const response = await axios.patch(`http://localhost:3333/products/${_id}`, {rating, click});
       const productUpdated = await response.data;
       return productUpdated;
    } catch(e) {
        console.log(e);
    }
});

export const addProduct = createAsyncThunk('product/addroduct', async(newProduct: Product) => {
    try {
        const response = await axios.post('http://localhost:3333/products/add', newProduct); 
        const newData = response.data;
        return newData;
    } catch(e) {
        console.log(e)
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(editProduct.fulfilled, (state, {payload}) => {
                state.products = payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.products = payload;
            });
    },
});

export const { actions: productsActions, reducer: productsReducer } = productsSlice;