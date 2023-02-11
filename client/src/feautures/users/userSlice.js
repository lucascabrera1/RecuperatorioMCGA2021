import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
//import initialstate from '../../Components/InitialState.json'
import axios from 'axios'

const initialState = {
    data:[],
    status: "idle",
    error: null
}


const URL_BASE = 'http://localhost:4500/usuarios/'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(URL_BASE)
        return [...response.data]
    } catch (error) {
        console.log(console.error(error))
        return error.message
    }
})

export const SaveUser = createAsyncThunk('users/saveUser', async (initialUSer) => {
    try {
        console.log('entra al save user')
        console.log(initialUSer)
        const response = await axios.post(URL_BASE, initialUSer)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error.message)
        return error.message
    }
})

export const DeleteUser = createAsyncThunk('users/DeleteUser', async (_id) => {
    try {
        const response = await axios.delete(URL_BASE + _id)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error.message)
        return error.message
    }
})

export const FetchUser = createAsyncThunk('users/fetchUser', async (_id)=> {
    try {
        const response = await axios.get(URL_BASE + _id)
        return response.data
    } catch (error) {
        console.error(error)
        return error.message
    }
})

export const UpdateUser = createAsyncThunk('users/UpdateUser', async(initialUSer) => {
    try {
        console.log(initialUSer)
        const response = await axios.patch(URL_BASE + initialUSer._id, initialUSer)
        return response.data
    } catch (error) {
        console.error(error.message)
        return error.message
    }
})

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        /* addUser: (state, action) => {
            console.log(action.type)
            console.log(action.payload)
            state.push(action.payload)
        }, */
        /* updateUser: (state, action) => {
            console.log(action.payload)
            const {_id, nombre, apellido, email, nacionalidad, edad, fechanacimiento, contraseña} = action.payload;
            const userFound = state.find(user => user._id === _id);
            if (userFound) {
                userFound.apellido = apellido;
                userFound.nombre = nombre;
                userFound.nacionalidad = nacionalidad;
                userFound.email = email;
                userFound.edad = edad;
                userFound.fechanacimiento = fechanacimiento;
                userFound.contraseña = contraseña
            }
        }, */
        /* deleteUser: (state, action) => {
            const userfound = state.find(user => user._id === action.payload)
            console.log(userfound)
            if (userfound) {
                console.log(action.payload)
                state.splice(state.indexOf(userfound), 1)
            }
        }, */
    },
    extraReducers: (builder) => {
            builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                console.log(state)
                state.status = "completed"
                state.data = action.payload
            })
            /* .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })  
            .addCase(fetchUsers.pending, (state, action) => {
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            }) */
            .addCase(SaveUser.fulfilled, (state, action) => {
                console.log('llega al save user')
                state.data.push(action.payload)
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter( (elem)=> {
                    return elem._id !== action.payload._id
                })
            })
            .addCase(UpdateUser.fulfilled, (state, action) => {
                state.data = state.data.map(item => {
                    if (item._id === action.payload._id){
                        return action.payload
                    } else {
                        return item
                    }
                })
                console.log(action.payload)
            }) 
            .addCase(FetchUser.fulfilled, (state, action) => {
                state.data = state.data.map(item => {
                    if (item._id === action.payload._id) {
                        return action.payload
                    } else {
                        return item
                    }
                })
            })
        }
    }
)

export const selectAllUsers = (state) => { console.log(state.users); return state.users.data}
export const getUsersStatus = (state) => state.users.status
export const getUsersErrors = (state) => state.users.error

export const {addUser, deleteUser, updateUser} = userSlice.actions

export default userSlice.reducer