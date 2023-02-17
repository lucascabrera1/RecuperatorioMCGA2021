import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteUser, selectAllUsers, getUsersStatus, fetchUsers } from '../feautures/users/userSlice'
import { useEffect } from 'react';

function UsersList() {
  const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)
    const status = useSelector(getUsersStatus)

    useEffect(()=>{
      if (status=="idle")
        dispatch(fetchUsers())
    },[status])
    
    const handleDelete = (_id, nombre) => {
      let ok = window.confirm(`¿Está seguro de que quiere eliminar al usuario: ${nombre}?`)
      if (ok) {dispatch(DeleteUser(_id))}
    }

  const toHumanDate = (date) => {
    let newDate = date.substring(0, 10)
    return newDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }  

  return (
    <div className='w-15/1 bg-red-100'>
      <h1 className='rounded-md bg-black'>Cantidad de usuarios registrados al momento: {users.length}</h1>
        <div className='grid grid-cols-3 gap-5 self-center'>
          {users.map( user => {
            return (
              <div key={user._id} className='bg-neutral-800 p-1 rounded-md'>
                  <header key={user._id} className='rounded-sm place-self-center'>
                    <p>id: {user._id}</p>
                    <p>nombre: {user.nombre}</p>
                    <p>apellido: {user.apellido}</p>
                    <p>fecha de nacimiento: {toHumanDate(user.fechanacimiento)}</p>
                    <p>documento:  {user.dni}</p>
                    <p>edad: {user.edad} años</p>
                    <p>email: {user.email}</p>
                    <p>nacionalidad: {user.nacionalidad}</p>
                    <div className='flex justify-between gap-x-5 p-7'>
                    <Link 
                        to={`/edit-user/${user._id}`} 
                        className='bg-indigo-600 px-2 py-1 rounded-sm text-xs self-center gap-3'> Edit
                      </Link>
                      <button 
                        onClick={()=> handleDelete(user._id, user.nombre)}
                        className = 'bg-red-500 px-2 py-1 text-xs rounded-md'
                      >Delete user</button>
                    </div>
                  </header>
              </div>
          )})}
        </div>
    </div>
  )
}

export default UsersList