import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {"id": "1", "Nombre" : "Juan", "Apellido": "Correa", "Nacionalidad" : "Bolivia"},
    {"id": "2", "Nombre": "Andres", "Apellido": "Casciani"},
    {"id": "3", "Nombre": "Valeria", "Apellido": "Cabrera"}
]

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
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
                userFound.FechaNacimiento = FechaNacimiento;
                userFound.Contrasena = Contrasena
            }
        },
        deleteUser: (state, action) => {
            const userfound = state.find(user => user.id === action.payload)
            console.log(userfound)
            if (userfound) {
                state.splice(state.indexOf(userfound), 1)
            }
        },
    },
})

export const {addUser, deleteUser, updateUser} = userSlice.actions
export default userSlice.reducer