import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../feautures/users/userSlice'
import nacionSlice from '../feautures/users/nacionSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        nations: nacionSlice
    },
})

console.log(store.getState())