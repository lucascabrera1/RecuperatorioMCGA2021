import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {SaveUser, UpdateUser} from '../feautures/users/userSlice'
//import {v4 as uuid} from 'uuid'
import { nanoid } from '@reduxjs/toolkit'
import {useNavigate, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { FetchUser } from '../feautures/users/userSlice'
import Button from './Button'

function UserForm() {

    const {register, handleSubmit, reset, getValues, formState : {errors}} = useForm()

    const [id,setId] = useState()

    const userInitial = {
        nombre: '',
        apellido: '',
        dni: '',
        nacionalidad: '',
        contraseña: '',
        email: '',
        fechanacimiento: '',
        edad: ''
    }

    const [user, setUser] = useState(userInitial)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const users = useSelector(state => state.users);
    const nations = useSelector(state => state.nations)

    const onSubmit = data => console.log(data)

    const fnac = data => data =  user.fechanacimiento

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
        return edad
    } 
    

    const handleChange = (e) => {
        console.log(e.target.name)
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        })
    }

    const handleBlur = (e) => {
        console.log(getValues())
        if (e.target.name == 'fechanacimiento') {
            let edad = CalcularEdad(e.target.value)
            console.log( edad)
            reset({
                ...getValues(),
                ["edad"] : edad
            })
        }
    }

    const handleSubmitUser = async (data, e) => {
        if (params.id) {
            try {
                console.log(data)
                await dispatch(UpdateUser({...data, id: params.id})).unwrap()
                alert("usuario modificado correctamente")
                e.target.reset()
                navigate('/users')
            } catch (error) {
                console.error(error)
            }
            
        } else {
            /*dispatch(SaveUser({
                ...user,
                //_id: uuid(),
                //_id: nanoid()
                _id : users.length + 1
            }))*/
            try {
                await dispatch(SaveUser(data)).unwrap()
                alert('usuario guardado correctamente')
                e.target.reset()
            } catch (error) {
                console.error(error)
            }
            
        }

        //navigate('/')
    }


    useEffect ( ()=> {
        async function fetchUser () {
            console.log('id del usuario')
            console.log(params.id)
            console.log('usuarios')
            console.log(users)
            if (params.id) {
                const userFounded = await (dispatch (FetchUser(params.id)).unwrap())
                const userfnac = {...userFounded, fechanacimiento : userFounded.fechanacimiento.substring(0, 10)}
                console.log(userfnac)
                reset(userfnac)
            }
        }
       fetchUser()
    }, [params])

    return (
        <div>
            <h1>User Form</h1>
            <form onSubmit={handleSubmit(handleSubmitUser)} className='bg-zinc-800 max-w-sm p-4 mb-1 mx-auto'>
                    <div>
                        <input
                            type='text'
                            {...register('nombre', {
                                required: true, 
                                maxLength: 50,
                                minLength: 3,
                                pattern: /^[A-Za-z]+$/i
                            })}
                            name='nombre'
                            placeholder='nombre'
                            className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                        />
                        {errors.nombre?.type === "required" && <span style={{color: "red"}} >el nombre es obligatorio</span>}
                        {errors.nombre?.type === "maxLength" && <span style={{color: "red"}} >no puede incluir mas de 50 caracteres</span>}
                        {errors.nombre?.type === "minLength" && <span style={{color: "red"}} >al menos 3 caracteres</span>}
                        {errors.nombre?.type === "pattern" && <span style={{color: "red"}} >solo caracteres de la a a la z</span>}
                        {console.log('nombre ' + user.nombre)}
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
                        name='apellido' 
                        placeholder='Apellido'
                        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
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
                        
                        placeholder='documento' 
                        
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
                        required: true
                    })}
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    name='email'
                    placeholder='email'
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
                            placeholder = 'fecha de nacimiento'
                            onBlur={handleBlur}
                        /> 
                    </div>
                    {errors.fechanacimiento?.type === "required" && <span style={{color: "red"}} >la fecha de nacimiento es requerida</span>}
                    {errors.fechanacimiento?.type === "min" && <span style={{color: "red"}} >no puede ser inferior a 1958</span>}
                    {errors.fechanacimiento?.type === "max" && <span style={{color: "red"}} >no puede ser superior a 2004</span>}
                    
                <br/><br/>
                <label className='block text-sm font-bold'>nacionalidad</label>
                {/* <select className='w-full p-2 rounded-md bg-zinc-600 mb-2' id='nacion' value="AR">
                    {nations.map(nation =>
                        <option key={nation.id} value="AR">{nation.name}</option>
                    )}
                </select> */}
                <div>
                    <input 
                        type='text'
                        {...register('nacionalidad', {
                            required: true, 
                            maxLength: 50,
                            minLength: 3,
                            pattern: /^[A-Za-z]+$/i
                        })}
                        name='nacionalidad' 
                        placeholder='Nacionalidad'
                        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    />
                        {errors.nacionalidad?.type === "required" && <span style={{color: "red"}} >la nacionalidad es obligatoria</span>}
                        {errors.nacionalidad?.type === "maxLength" && <span style={{color: "red"}} >no puede incluir mas de 50 caracteres</span>}
                        {errors.nacionalidad?.type === "minLength" && <span style={{color: "red"}} >al menos 3 caracteres</span>}
                        {errors.nacionalidad?.type === "pattern" && <span style={{color: "red"}} >solo caracteres de la a a la z</span>}
                </div>
                <br/><br/>

                <p>edad</p>
                
               {  <input 
                    type='number'
                    className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                    name='edad'
                    placeholder='edad' 
                    disabled
                    {...register('edad')}
                />}
                <br/><br/>
                <div>
                <label>contraseña</label>
                    <input 
                        type='password'
                        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
                        name='contraseña'
                        placeholder= 'contraseña'
                        {...register('contraseña', {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors.contraseña?.type === "required" && <span style={{color: "red"}} >la contraseña es obligatoria</span>}
                    {errors.contraseña?.type === "minLength" && <span style={{color: "red"}} >al menos 6 caracteres</span>}
                </div>
                
                <br/><br/>
                <Button type="submit" label="Save"></Button>
            </form>
        </div>    
    )
}

export default UserForm