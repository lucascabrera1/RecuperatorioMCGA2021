import mongoose from "mongoose";

let schemaUsuario = new mongoose.Schema ({
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
    /*edad: {
        type: Number,
        required : true
    },*/
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

schemaUsuario.virtual("edad").get(function() {
    //calcualr edad a partir de this.fechanacimiento
    return 40;
})

schemaUsuario.set("toJSON", {
    virtuals: true
})

export default mongoose.model('User', schemaUsuario)