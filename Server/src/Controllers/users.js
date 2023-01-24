import User from '../Models/User.js'

const ValidateUser = (body) => {
    if (body.nombre == null || body.nombre.length < 1) {
        return "el nombre es obligatorio"
    }
    return null
}

const AddUser = async (req, res) => {
    try {
        let error = ValidateUser(req.body)
        if (!error) {
            const newUSer =  new User(req.body)
            //console.log(newUSer)
            const usuarioGuardado = await newUSer.save()
            console.log(usuarioGuardado)
            return res.send(usuarioGuardado)
        } else{
            res.status(400).json({
                error: true,
                message: error
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: error.message})
    }
} 

const DeleteUser = async (req, res) => {
    try {
        const userfound = await User.findOneAndRemove({_id: req.params.id})
        if (!userfound || userfound.length === 0){
            return res.status(404).json({
                error: true,
                message: "User not found"
            })
        }
        return res.status(200).json(userfound)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

const EditUser = async (req, res) => {
     try {
        const updatedUser = await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new : true})
        return res.send(updatedUser)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUsers = async (req, res) => {
    try {
        console.log(req.params)
        const usuarios = await User.find({})
        let usuariosdevueltos = []
        console.log(usuarios)
        for (const elem of usuarios) {
            let newElem = {
                "_id" : elem._id,
                "nombre" : elem.nombre,
                "apellido" : elem.apellido,
                "email" : elem.email,
                "dni" : elem.dni,
                "contraseña" : elem.contraseña,
                "fechaNacimiento" : elem.fechanacimiento,
                "edad" : elem.edad,
                "nacionalidad" : elem.nacionalidad
            }
            usuariosdevueltos.push(newElem)
        }
        return res.json(usuariosdevueltos);
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message: error.message})
    }
}

const getUserByDni = async (req, res) => {
    console.log(req.params.dni)
    try {
        const response = await User.findOne({dni : req.params.dni})
        console.log(req.params)
        if (!response || response.length === 0){
            return res.status(404).json({
                error: true,
                message : "User not Found"
            })
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            error: true,
            message : error
        })
    }
}

const getUserByEmail = async (req, res) =>{
    console.log(req.params.email)
    try {
        const response = await User.findOne({email : req.params.email})
        console.log(req.params)
        if (!response || response.length === 0){
            return res.status(404).json({
                error: true,
                message : "User not Found"
            })
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            error: true,
            message : error
        })
    }
}

const todosLosMetodos = async (req, res) => {
    return await res.send("devuelve el mismo mensaje independientemente del metodo seleccionado")
}

export default {AddUser, EditUser, DeleteUser, getUsers, getUserByDni, getUserByEmail, todosLosMetodos}