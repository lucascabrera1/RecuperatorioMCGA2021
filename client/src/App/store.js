import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import usersReducer from '../feautures/users/userSlice'
import nacionSlice from '../feautures/users/nacionSlice'
import thunk from 'redux-thunk';

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
        nations: nacionSlice
    },
}, applyMiddleware(thunk))

//console.log(store.getState())