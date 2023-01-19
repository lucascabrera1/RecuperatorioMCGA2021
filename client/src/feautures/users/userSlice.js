import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
//import initialstate from '../../Components/InitialState.json'
import axios from 'axios'

const initialState = []

const URL_BASE = 'https://jsonplaceholder.typicode.com/users'
console.log(URL_BASE)

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(URL_BASE)
        console.log('al menos llega al fetchUsers')
        console.log(response.data.data)
        return response.data
    } catch (error) {
        console.log(console.error(error))
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
            const {id, Nombre, Apellido, Email, Nacionalidad, Edad, FechaNacimiento, Contrasena} = action.payload;
            const userFound = state.find(user => user.id === id);
            if (userFound) {
                userFound.Apellido = Apellido;
                userFound.Nombre = Nombre;
                userFound.Nacionalidad = Nacionalidad;
                userFound.Email = Email;
                userFound.Edad = Edad;
                userFound.Fechanacimiento = FechaNacimiento;
                userFound.Contrasena = Contrasena
            }
        },
        deleteUser: (state, action) => {
            const userfound = state.find(user => user.id === action.payload)
            console.log(userfound)
            if (userfound) {
                console.log(action.payload)
                state.splice(state.indexOf(userfound), 1)
            }
        }},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
        })
    }
    }
)

export const selectAllUsers = (state) => state.users
export const getUsersStatus = (state) => state.users.status
export const getUsersErrors = (state) => state.users.error

export const {addUser, deleteUser, updateUser} = userSlice.actions

export default userSlice.reducer