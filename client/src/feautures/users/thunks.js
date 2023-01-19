import {configureStore, applyMiddleware, combineReducers } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import nacionSlice from "./nacionSlice"
import userSlice from "./userSlice"

const reducer = combineReducers({nacionSlice, userSlice})

export const logger = (store) => (next) => (action) => {
    
    //next indica el siguiente paso
    //puede decidir si continúa con esa acción o si ejecuta otra acción
    //tenemos el control de las acciones, no importa quien las emita
    //next(action)
    console.log('llega al middleware')
    console.log(action)
    next(action)
}

const store = configureStore(reducer, applyMiddleware(logger, thunk))

export default store