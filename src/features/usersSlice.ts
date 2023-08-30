import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { User } from '../utils/User';


interface UsersState {
    user: User | null;
    loading: boolean;
}

const initialState: UsersState = {
    user: null,
    loading: false,
};


// export const getUser = createAsyncThunk('users/getUser', async (_id) => {
//     const data = axios.get(`http://localhost:3333/users/${_id}`);
//     const usersData = (await data).data as User;
//     return usersData || null;
// });

export const createUser = createAsyncThunk('users/createUser', async (user: User) => {
    const response = await axios.post('http://localhost:3333/users/register', {...user});
    return response.data;
})

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
    }
});

export const {actions: userActions, reducer: userReducer} = usersSlice;