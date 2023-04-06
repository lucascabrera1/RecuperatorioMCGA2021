import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../feautures/users/userSlice'
import nacionSlice from '../feautures/users/nacionSlice'
import authSlice from '../feautures/users/authSlice';

/* const myMiddleware = store => next => action =>  {
    console.log("middleware running")
    return next(action)
}

const otherMiddleware = store => next => action =>  {
    console.log("other middleware running")
    return next(action)
} */


export const store = configureStore({
    reducer: {
        users: usersReducer,
        nations: nacionSlice,
        auth: authSlice
    }
})

//console.log(store.getState())