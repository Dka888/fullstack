import { configureStore } from '@reduxjs/toolkit';
import { basketReducer } from '../features/basketSlice';
import { productsReducer } from '../features/productsSlice';
import { userReducer } from '../features/usersSlice';
import loginReducer from '../features/loginSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    products: productsReducer,
    users: userReducer,
    login: loginReducer
  },
});



export type RootState = ReturnType<typeof store.getState>;