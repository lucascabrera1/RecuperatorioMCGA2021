import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, updateUser} from '../feautures/users/userSlice'
import {v4 as uuid} from 'uuid'
import {useNavigate, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'

function UserForm() {

    const {register, handleSubmit, formState : {errors}} = useForm()

    const [user, setUser] = useState({
        _id: '',
        nombre: '',
        apellido: '',
        dni: '',
        nacionalidad: '',
        contraseña: '',
        email: '',
        fechanacimiento: '',
        edad: ''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const users = useSelector(state => state.users);
    const nations = useSelector(state => state.nations)

    const onSubmit = data => console.log(data)

    const fnac = data => data =  user.Fechanacimiento

    /*const CalcularEdad = fnac => {
        console.log(fnac)
        const fechaActual = new Date();
        const anoActual = parseInt(fechaActual.getFullYear())
        const mesActual = parseInt(fechaActual.getMonth())+1;
        const diaActual = parseInt(fechaActual.getDate())
        const anoNacimiento = parseInt(String(fnac).substring(0, 4))
        const mesNacimiento = parseInt(String(fnac).substring(5, 7))
        const diaNacimiento = parseInt(String(fnac).substring(8, 10))
        let edad = anoActual - anoNacimiento;
        if(mesActual<mesNacimiento){
            edad--
        } else if (mesActual === mesNacimiento) {
            if (diaActual < diaNacimiento) {
                edad--
            }
        }
        user.edad = edad
        return user.edad
    } */
    

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitUser = (e) => {
        const data = user
        console.log(params)
        e.preventDefault();
        if (params.id) {
            dispatch(updateUser({
                ...user, id: params.id
            }))
        } else {
            dispatch(addUser({
                ...user,
                _id: uuid(),
            }))
        }
        navigate('/')
    }


    useEffect (()=> {
        console.log('id del usuario')
        console.log(params.id)
        console.log('usuarios')
        console.log(users)
        if (params.id) {
            setUser(users.find((user) => user._id === params.id))
            console.log('usuario encontrado')
            console.log(user)
        }
    }, [params, users])

    return (
        <div>
            <h1>User Form</h1>
            <form onSubmit={handleSubmitUser} className='bg-zinc-800 max-w-sm p-4 mb-1 mx-auto'>
                    <div>
                        <input
                            type='text'
                            {...register('nombre', {
                                required: true, 
                                maxLength: 50,
                                minLength: 3,
                                pattern: /^[A-Za-z]+$/i
                            })}
                            value={user.nombre}
                            name='nombre'
                            placeholder='nombre' 
                            onChange={handleChange}
                            className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                        />
                        {errors.nombre?.type === "required" && <span style={{color: "red"}} >el nombre es obligatorio</span>}
                        {errors.nombre?.type === "maxLength" && <span style={{color: "red"}} >no puede incluir mas de 50 caracteres</span>}
                        {errors.nombre?.type === "minLength" && <span style={{color: "red"}} >al menos 3 caracteres</span>}
                        {errors.nombre?.type === "pattern" && <span style={{color: "red"}} >solo caracteres de la a a la z</span>}
                        {console.log(user.nombre)}
                    </div>
                <br/><br/>
                <div>
                    <input 
                        type='text'
                        {...register('apellido', {
                            required: true, 
                            maxLength: 50,
                            minLength: 3,
                            pattern: /^[A-Za-z]+$/i
                        })}
                        value={user.apellido}
                        name='apellido' 
                        placeholder='Apellido'
                        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                        onChange={handleChange}
                    />
                        {errors.apellido?.type === "required" && <span style={{color: "red"}} >el apellido es obligatorio</span>}
                        {errors.apellido?.type === "maxLength" && <span style={{color: "red"}} >no puede incluir mas de 50 caracteres</span>}
                        {errors.apellido?.type === "minLength" && <span style={{color: "red"}} >al menos 3 caracteres</span>}
                        {errors.apellido?.type === "pattern" && <span style={{color: "red"}} >solo caracteres de la a a la z</span>}
                </div>
                <br/><br/>
                <div>
                    <input
                        type='number'
                        {...register('dni', {
                            required: true, 
                            maxLength: 10,
                            minLength: 6
                        })}
                        name='dni'
                        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                        value={user.dni}
                        placeholder='documento' 
                        onChange={handleChange}
                    />
                    {errors.dni?.type === "required" && <span style={{color: "red"}} >el documento es requerido</span>}
                    {errors.dni?.type === "maxLength" && <span style={{color: "red"}} >no puede incluir mas de 10 caracteres</span>}
                    {errors.dni?.type === "minLength" && <span style={{color: "red"}} >al menos 6 caracteres</span>}
                </div>
                <br/><br/>
                <div>
                <input 
                    type='email'
                    {...register('email', {
                        required: true, 
                        maxLength: 10,
                        minLength: 6
                    })}
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    name='email'
                    value={user.email}
                    placeholder='email' 
                    onChange={handleChange}
                    />
                    {errors.email?.type === "required" && <span style={{color: "red"}} >el email es requerido</span>}
                </div>
                <br/><br/>
                <label className='block text-sm font-bold'>Fecha de nacimiento</label>
                    <div>
                        <input 
                            type='date'
                            {...register('fechanacimiento', {
                                required: true, 
                                min: "1958-01-01",
                                max: "2004-12-31"
                            })}
                            className='w-full p-2 rounded-md bg-zinc-600 mb-2' 
                            name='fechanacimiento'
                            value={user.fechanacimiento}
                            placeholder = 'fecha de nacimiento' 
                            onChange={handleChange}
                        /> 
                    </div>
                    {errors.fechanacimiento?.type === "required" && <span style={{color: "red"}} >la fecha de nacimiento es requerida</span>}
                    {errors.fechanacimiento?.type === "min" && <span style={{color: "red"}} >no puede ser inferior a 1958</span>}
                    {errors.fechanacimiento?.type === "max" && <span style={{color: "red"}} >no puede ser superior a 2004</span>}
                    
                <br/><br/>
                <label className='block text-sm font-bold'>nacionalidad</label>
                <select className='w-full p-2 rounded-md bg-zinc-600 mb-2' id='nacion'>
                    {nations.map(nation =>
                        <option key={nation.id} value={nation.id}>{nation.name}</option>
                    )}
                </select>
                <br/><br/>

                <p>edad {user.edad} años</p>
                
               {/*  <input 
                    type='number'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    name='Edad'
                    value={user.Edad}
                    placeholder='edad' 
                    onChange={handleChange}
                /> */}
                <br/><br/>
                <input 
                    type='password'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    name='contraseña'
                    value={user.contraseña}
                    placeholder= 'contraseña' 
                    onChange={handleChange}
                /> 
                <br/><br/>
                <button type='submit' className='bg-indigo-600 px-2 py-1'>Save</button>
            </form>
        </div>    
    )
}

export default UserForm