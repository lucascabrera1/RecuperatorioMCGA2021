import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {SaveUser, UpdateUser} from '../feautures/users/userSlice'
//import {v4 as uuid} from 'uuid'
import { nanoid } from '@reduxjs/toolkit'
import {useNavigate, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { FetchUser } from '../feautures/users/userSlice'
import Button from './Common/Button'
import Input from './Common/Input'
import styles from './style.module.css'

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
        console.log('se llama al handle submit user')
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
            console.log(data)
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
                <Input
                    type="text"
                    name="nombre"
                    label="nombre"
                    register={register}
                    registerOptions= {{
                        required: true, maxLength: 50, minLength: 3, pattern: /^[A-Za-z]+$/i 
                    }}
                    errors= {errors}
                    optionMsgErrors={{
                        required: "el nombre es obligatorio",
                        maxLength: "no puede incluir mas de 50 caracteres",
                        minLength: "al menos 3 caracteres",
                        pattern: "solo caracteres de la a la z sin espacios"
                    }}
                />
                <br/><br/>
                <Input
                    type='text'
                    name='apellido'
                    label='Apellido'
                    register={register}
                    registerOptions= {{
                        required: true, maxLength: 50, minLength: 3, pattern: /^[A-Za-z]+$/i 
                    }}
                    errors= {errors}
                    optionMsgErrors={{
                        required: "el apellido es obligatorio",
                        maxLength: "no puede incluir mas de 50 caracteres",
                        minLength: "al menos 3 caracteres",
                        pattern: "solo caracteres de la a la z sin espacios"
                    }}
                />
                <br/><br/>
                <Input
                    type='number'
                    name='dni' 
                    label='Documento'
                    register={register}
                    registerOptions= {{
                        required: true, maxLength: 10, minLength: 6 
                    }}
                    errors= {errors}
                    optionMsgErrors={{
                        required: "el documento es obligatorio",
                        maxLength: "máximo 10 caracteres",
                        minLength: "mínimo 6 caracteres",
                    }}
                />
                
                <br/><br/>
                <Input
                    type='email'
                    name='email' 
                    label='Correo Electrónico'
                    register={register}
                    registerOptions= {{
                        required: true
                    }}
                    errors= {errors}
                    optionMsgErrors={{
                        required: "el correo electrónico es obligatorio"
                    }}
                />
                
                <br/><br/>
                    <Input
                        onBlur={handleBlur}
                        type='date'
                        name='fechanacimiento' 
                        label='fechanacimiento'
                        register={register}
                        registerOptions= {{
                            required: true, min: "1958-01-01",max: "2004-12-31"
                        }}
                        errors= {errors}
                        optionMsgErrors={{
                            required: "la fecha de nacimiento es requerida",
                            maxLength: "no puede ser inferior a 1958",
                            minLength: "no puede ser superior a 2004",
                        }}
                    />

                
                <br/><br/>
            
                
                <Input
                        type='text'
                        name='nacionalidad' 
                        label='Nacionalidad'
                        register={register}
                        registerOptions= {{
                            required: true, pattern: /^[A-Za-z]+$/i
                        }}
                        errors= {errors}
                        optionMsgErrors={{
                            required: "la nacionalidad es requerida",
                            pattern: "solo caracteres de la a a la z sin espaciados"
                        }}
                    />
                <br/><br/>
                <Input
                    type='number'
                    name='edad' 
                    label='Edad'
                    register={register}
                    registerOptions= {{
                    }}
                    errors= {errors}
                    disabled
                />
                <br/><br/>

                <Input
                    type='password'
                    name='contraseña'
                    label='contraseña'
                    register={register}
                    registerOptions= {{
                        required: true, minLength: 6
                    }}
                    errors= {errors}
                    optionMsgErrors={{
                        required: "la contraseña es requerida",
                        minLength: "minimo 6 caracteres",
                    }}
                />
                <br/><br/>
                
                <br/><br/>
                <Button type="submit" className={`${styles.bgindigo600} ${styles.py1} ${styles.px2}`}>Save</Button>
            </form>
        </div>    
    )
}

export default UserForm