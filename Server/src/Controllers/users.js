import User from '../Models/User.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
const stoken = process.env.SECRET

const ValidateUser = (body) => {
    if (body.nombre == null || body.nombre.length < 1) {
        return "el nombre es obligatorio"
    }
    return null
}

const GetUser = async (req, res) =>{
    try {
        const userfound = await User.findOne({_id: req.params.id})
        userfound.contraseña = await userfound.encryptPassword(userfound.contraseña)
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

const AddUser = async (req, res) => {
    try {
        let error = ValidateUser(req.body)
        if (!error) {
            const newUSer =  new User(req.body)
            newUSer.contraseña = await newUSer.encryptPassword(newUSer.contraseña)
            console.log(newUSer.contraseña)
            const usuarioGuardado = await newUSer.save()
            console.log(stoken)
            const token = jwt.sign({id: newUSer._id}, stoken, {
                expiresIn: 60 * 60 *24
            })
            console.log(usuarioGuardado)
            res.json({auth: true, token: token})
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
            elem.contraseña = await elem.encryptPassword(elem.contraseña)
            let newElem = {
                "_id" : elem._id,
                "nombre" : elem.nombre,
                "apellido" : elem.apellido,
                "email" : elem.email,
                "dni" : elem.dni,
                "contraseña" : elem.contraseña,
                "fechanacimiento" : elem.fechanacimiento,
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
        response.contraseña = await response.encryptPassword(response.contraseña),
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
        response.contraseña = await response.encryptPassword(response.contraseña),
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

export default {AddUser, 
    GetUser, 
    EditUser, 
    DeleteUser, 
    getUsers, 
    getUserByDni, 
    getUserByEmail, 
    todosLosMetodos
}