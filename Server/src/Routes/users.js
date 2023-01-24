import express from 'express'
import users from '../Controllers/users.js'
import morgan from 'morgan'

const router = express()

router.use(express.json())
router.use(morgan('short'))

//middleware sin morgan
 router.use((req, res, next) => {
    console.log(`url : ${req.url} method: ${req.method}`)
    console.log("paso por la funcion app.use")
    console.log(req.params)
    next()
}) 

router.route('/usuarios')
    .get(users.getUsers)
    .post(users.AddUser)
router.route('/usuarios/:id')
    .patch(users.EditUser)
    .delete(users.DeleteUser)
router.get('/usuarios/buscarpordni/:dni', users.getUserByDni)
router.get('/usuarios/buscarpormail/:email', users.getUserByEmail)

export default router