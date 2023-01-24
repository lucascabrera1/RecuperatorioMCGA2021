import mongoose from "mongoose";

const schemaUsuario = new mongoose.Schema ({
    nombre : {
        type: String,
        required: true
    },
    apellido : {
        type: String,
        required : true
    },
    fechanacimiento : {
        type: Date,
        required: true
    },
    dni : {
        type : Number,
        unique: true,
        required: true
    },
    edad: {
        type: Number,
        required : true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required : true
    }
})

export default mongoose.model('User', schemaUsuario)