import React from "react";
import Input from "../../Components/Common/Input";
import Button from "../../Components/Common/Button";
import {useForm} from 'react-hook-form'
import styles from '../../Components/style.module.css'
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../feautures/users/authSlice";
import { useLoginMutation } from "../apiAuth/authApiSlice";


const Login = () =>{
    const {register, handleSubmit, reset, getValues, formState : {errors}} = useForm()

    const SubmitUser = async (user) => {
        console.log(user)
        try {
            const userData = await login({user, pwd})
            dispatch(setCredentials({...userData, user}))
            setUser('')
            setPwd('')
            console.log({user, pwd})
            navigate('/users')
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No server response')
            } else if (error.response?.status === 400) {
                setErrMsg('Missing username or password')
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            console.error(error)
        }
        //console.log(userData)
        errRef.current?.focus()
        alert('aca junto los datos del usuario')
    }

    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current?.onFocus()
    }, [])

    useEffect(() => {
        setErrMsg(errMsg)
    }, [user, pwd])
    

    return (
        <form onSubmit={handleSubmit(SubmitUser)}>
            
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
            <Button 
                type="submit"
                className={`${styles.bgindigo600} ${styles.py1} ${styles.px2}`}>
            Iniciar Sesión </Button>
        </form>
    )
}

export default Login;