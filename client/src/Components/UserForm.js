import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, updateUser} from '../feautures/users/userSlice'
import {v4 as uuid} from 'uuid'
import {useNavigate, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'

function UserForm() {

    const {register, handleSubmit, formState : {errors}} = useForm()

    const [user, setUser] = useState({
        id: '',
        Nombre: '',
        Apellido: '',
        Dni: '',
        Nacionalidad: '',
        Password: '',
        Email: '',
        Fechanacimiento: '',
        Edad: ''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const users = useSelector(state => state.users);
    const nations = useSelector(state => state.nations)

    const onSubmit = data => console.log(data)

    const fnac = data => data =  user.Fechanacimiento

    const CalcularEdad = fnac => {
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
        user.Edad = edad
        return user.Edad
    }
    

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitUser = (e) => {
        e.preventDefault();
        if (params.id) {
            dispatch(updateUser({
                ...user, id: params.id
            }))
        } else {
            dispatch(addUser({
                ...user,
                id: uuid(),
            }))
        }
        
        navigate('/')
    }


    useEffect (()=> {
        console.log(params.id)
        console.log(users)
        if (params.id) {
            setUser(users.find((user) => user.id === params.id))
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
                            {...register('Nombre', {
                                required: true, 
                                maxLength: 50,
                                minLength: 3,
                                pattern: /^[A-Za-z]+$/i
                            })}
                            value={user.Nombre}
                            name='Nombre'
                            placeholder='nombre' 
                            onChange={handleChange}
                            className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                        />
                        {errors.Nombre?.type === "required" && <span style={{color: "red"}} >el nombre es obligatorio</span>}
                        {errors.Nombre?.type === "maxLength" && <span style={{color: "red"}} >no puede incluir mas de 50 caracteres</span>}
                        {errors.Nombre?.type === "minLength" && <span style={{color: "red"}} >al menos 3 caracteres</span>}
                        {errors.Nombre?.type === "pattern" && <span style={{color: "red"}} >solo caracteres de la a a la z</span>}
                        {console.log(user.Nombre)}
                    </div>
                <br/><br/>
                <div>
                    <input 
                        type='text'
                        {...register('Apellido', {
                            required: true, 
                            maxLength: 50,
                            minLength: 3,
                            pattern: /^[A-Za-z]+$/i
                        })}
                        value={user.Apellido}
                        name='Apellido' 
                        placeholder='apellido'
                        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                        onChange={handleChange}
                    />
                        {errors.Apellido?.type === "required" && <span style={{color: "red"}} >el nombre es obligatorio</span>}
                        {errors.Apellido?.type === "maxLength" && <span style={{color: "red"}} >no puede incluir mas de 50 caracteres</span>}
                        {errors.Apellido?.type === "minLength" && <span style={{color: "red"}} >al menos 3 caracteres</span>}
                        {errors.Apellido?.type === "pattern" && <span style={{color: "red"}} >solo caracteres de la a a la z</span>}
                </div>
                <br/><br/>
                <div>
                    <input
                        type='number'
                        {...register('Dni', {
                            required: true, 
                            maxLength: 10,
                            minLength: 6
                        })}
                        name='Dni'
                        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                        value={user.Dni}
                        placeholder='documento' 
                        onChange={handleChange}
                    />
                    {errors.Dni?.type === "required" && <span style={{color: "red"}} >el documento es requerido</span>}
                    {errors.Dni?.type === "maxLength" && <span style={{color: "red"}} >no puede incluir mas de 10 caracteres</span>}
                    {errors.Dni?.type === "minLength" && <span style={{color: "red"}} >al menos 6 caracteres</span>}
                </div>
                <br/><br/>
                <div>
                <input 
                    type='email'
                    {...register('Email', {
                        required: true, 
                        maxLength: 10,
                        minLength: 6
                    })}
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    name='Email'
                    value={user.Email}
                    placeholder='email' 
                    onChange={handleChange}
                    />
                    {errors.Email?.type === "required" && <span style={{color: "red"}} >el email es requerido</span>}
                </div>
                <br/><br/>
                <label className='block text-sm font-bold'>Fecha de nacimiento</label>
                    <div>
                        <input 
                            type='date'
                            {...register('Fechanacimiento', {
                                required: true, 
                                min: "1958-01-01",
                                max: "2004-12-31"
                            })}
                            className='w-full p-2 rounded-md bg-zinc-600 mb-2' 
                            name='Fechanacimiento'
                            value={user.Fechanacimiento}
                            placeholder = 'fecha de nacimiento' 
                            onChange={handleChange}
                        /> 
                    </div>
                    {errors.Fechanacimiento?.type === "required" && <span style={{color: "red"}} >la fecha de nacimiento es requerida</span>}
                    {errors.Fechanacimiento?.type === "min" && <span style={{color: "red"}} >no puede ser inferior a 1958</span>}
                    {errors.Fechanacimiento?.type === "max" && <span style={{color: "red"}} >no puede ser superior a 2004</span>}
                    
                <br/><br/>
                <label className='block text-sm font-bold'>nacionalidad</label>
                <select className='w-full p-2 rounded-md bg-zinc-600 mb-2' id='nacion'>
                    {nations.map(nation =>
                        <option key={nation.id} value={user.Nacionalidad}>{nation.name}</option>
                    )}
                </select>
                <br/><br/>

                <p>edad {user.Edad} años</p>
                
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
                    name='Password'
                    value={user.Password}
                    placeholder= 'password' 
                    onChange={handleChange}
                /> 
                <br/><br/>
                <button type='submit' className='bg-indigo-600 px-2 py-1'>Save</button>
            </form>
        </div>    
    )
}

export default UserForm