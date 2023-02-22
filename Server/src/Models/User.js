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
    //console.log(this.fechanacimiento)
    let hoy = new Date();
    //console.log(hoy)
    let edad =  hoy.getFullYear() - this.fechanacimiento.getFullYear();
    //console.log(edad)
    if (hoy.getMonth() < this.fechanacimiento.getMonth()){
        return --edad
    }
    else if ((hoy.getMonth() === this.fechanacimiento.getMonth())  && 
    hoy.getDay() < this.fechanacimiento.getDay()){
        console.log(edad)
        return --edad
    }
    else return edad;
})

schemaUsuario.set("toJSON", {
    virtuals: true
})

export default mongoose.model('User', schemaUsuario)