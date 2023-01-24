import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
//import initialstate from '../../Components/InitialState.json'
import axios from 'axios'

const initialState = []

const URL_BASE = 'https://jsonplaceholder.typicode.com/users'

const URL_BASE2 = 'http://localhost:4500/usuarios'
console.log(URL_BASE)

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    console.log('al menos llega al fetchUsers')
    try {
        console.log('llega al try')
        const response = await axios.get(URL_BASE2)
        console.log(response.data)
        return [...response.data]
    } catch (error) {
        console.log(console.error(error))
        return error.message
    }
})

export const SaveUser = createAsyncThunk('users/saveUser', async () => {
    try {
        const response = await axios.post(URL_BASE2)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
        return error.message
    }
})

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log(action.type)
            console.log(action.payload)
            state.push(action.payload)
        },
        updateUser: (state, action) => {
            console.log(action.payload)
            const {_id, nombre, apellido, email, nacionalidad, edad, fechaNacimiento, contraseña} = action.payload;
            const userFound = state.find(user => user._id === _id);
            if (userFound) {
                userFound.apellido = apellido;
                userFound.nombre = nombre;
                userFound.nacionalidad = nacionalidad;
                userFound.email = email;
                userFound.edad = edad;
                userFound.fechanacimiento = fechaNacimiento;
                userFound.contraseña = contraseña
            }
        },
        deleteUser: (state, action) => {
            const userfound = state.find(user => user._id === action.payload)
            console.log(userfound)
            if (userfound) {
                console.log(action.payload)
                state.splice(state.indexOf(userfound), 1)
            }
        },
    },
    extraReducers: builder => {
            builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
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
                SaveUser(...state, action.payload)
            })
        }
    }
)

export const selectAllUsers = (state) => state.users
export const getUsersStatus = (state) => state.users.status
export const getUsersErrors = (state) => state.users.error

export const {addUser, deleteUser, updateUser} = userSlice.actions

export default userSlice.reducer