import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    data:[],
    status: "idle",
    error: null
}

export const setToken =  createAsyncThunk ('', async() => {
//peticion axios para buscar el token
})

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {user: null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload
            state.user = user
            state.accessToken = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
    extraReducers: {
        //aca deberia setear el token
    }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const getToken = (state) => state.auth.getToken

export const getUser = (state) => state.auth.getUser