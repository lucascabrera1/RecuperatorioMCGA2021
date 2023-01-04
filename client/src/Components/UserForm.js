import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, updateUser} from '../feautures/users/userSlice'
import {v4 as uuid} from 'uuid'
import {useNavigate, useParams} from 'react-router-dom'

function UserForm() {

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



    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
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
            <form onSubmit={handleSubmit} className='bg-zinc-800 max-w-sm p-4 mb-1'>
                <label htmlFor='Nombre'>Nombre:</label>
                <input
                    type='text'
                    value={user.Nombre}
                    name='Nombre'
                    placeholder='nombre' 
                    onChange={handleChange}
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                /> 
                <br/><br/>
                <label htmlFor='Apellido' className='block text-sm font-bold'>Apellido</label>
                <input 
                    type='text'
                    value={user.Apellido}
                    name='Apellido' 
                    placeholder='apellido'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    onChange={handleChange}
                /> 
                <br/><br/>
                <input 
                    type='number' 
                    name='Dni'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    value={user.Dni}
                    placeholder='documento' 
                    onChange={handleChange}
                /> 
                <br/><br/>
                <input 
                    type='email'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    name='Email'
                    value={user.Email}
                    placeholder='email' 
                    onChange={handleChange}
                /> 
                <br/><br/>
                <label>Fecha de nacimiento</label>
                <input 
                    type='date'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2' 
                    name='Fechanacimiento'
                    value={user.Fechanacimiento}
                    placeholder = 'fecha de nacimiento' 
                    onChange={handleChange}
                /> 
                <br/><br/>
                <input 
                    type='text'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2' 
                    name='Nacionalidad'
                    value={user.Nacionalidad}
                    placeholder='nacionalidad' 
                    onChange={handleChange}
                /> 
                <br/><br/>
                <input 
                    type='number'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    name='Edad'
                    value={user.Edad}
                    placeholder='edad' 
                    onChange={handleChange}
                /> 
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