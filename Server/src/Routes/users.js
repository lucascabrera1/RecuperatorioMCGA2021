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

router.post('/registrar', users.AddUser)
router.patch('/modificar/:id', users.EditUser)
router.get('/vertodos', users.getUsers)
router.get('/buscarpordni/:dni', users.getUserByDni)
router.get('/buscarpormail/:email', users.getUserByEmail)
router.delete('/eliminar/:id', users.DeleteUser)
router.all('/todoslosmetodos', users.todosLosMetodos)

export default router