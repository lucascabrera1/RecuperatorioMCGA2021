import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
const stoken = process.env.SECRET

function verifyToken (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "no token provided"
        })
    }
    const decoded = jwt.verify(token, stoken)
    console.log(decoded)
    req.userId = decoded.id
    console.log(req.userId)
    next();
}

export default verifyToken