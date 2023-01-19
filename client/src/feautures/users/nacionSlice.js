import { createSlice } from "@reduxjs/toolkit";
import nations from '../../Components/Naciones.json'

const initialState = nations

export const nacionSlice = createSlice({
    name: 'nation',
    initialState,
    reducers: {
            listNations : (state, action) => {
                console.log(action)
                state.concat(...action.payload)
            }
        },
    },
)

export const {listNations} = nacionSlice.actions
console.log(nacionSlice.actions)
export default nacionSlice.reducer