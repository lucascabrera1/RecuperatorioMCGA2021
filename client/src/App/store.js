import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../feautures/users/userSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer
    }
})
