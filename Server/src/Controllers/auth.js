import User from "../Models/User.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
const stoken = process.env.SECRET


const SignIn = async (req, res, next) => {
    const {email, contraseña} = req.body
    console.log(email. contraseña)
    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(404).send("User doesn't exists ")
    }
    const pwdisvalid = await user.validatePassword(contraseña)
    if (!pwdisvalid) {
        return res.status(401).send({auth: false, token: null})
    }
    const token = jwt.sign({id: user._id}, stoken, {
        expiresIn: 60 * 60 *24
    })
    res.json({auth: true, token: token})
}

const Me =  async (req, res, next) => {
    const user = await User.findById(req.userId)
    if (!user) {
        res.status(404).send('User not founded')
    } else {
        res.json(user)
    }
}

export default {SignIn, Me}