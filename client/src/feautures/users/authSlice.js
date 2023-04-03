import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

/* const initialState = {
    data:[],
    status: "idle",
    error: null
} */

export const setToken =  createAsyncThunk ('', async() => {
//peticion axios para buscar el token
})

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {user: null, accessToken: null},
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload
            state.user = user
            state.accessToken = accessToken
            console.log(accessToken)
            console.log(user)
            console.log(action.payload.user)
        },
        logOut: (state, action) => {
            state.user = null
            state.accessToken = null
        }
    },
    extraReducers: {
        //aca deberia setear el token
    }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.accessToken

export const selectCurrentUser = (state) => state.auth.user