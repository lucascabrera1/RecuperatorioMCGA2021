import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import usersReducer from '../feautures/users/userSlice'
import nacionSlice from '../feautures/users/nacionSlice'
//import { logger } from '../feautures/users/thunks'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        nations: nacionSlice
    },
})

console.log(store.getState())