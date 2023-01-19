import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, fetchUsers,  getUsersStatus, selectAllUsers } from '../feautures/users/userSlice'
import { useEffect } from 'react'

function UsersList() {
  const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)
    const userStatus = useSelector(getUsersStatus)
    console.log(userStatus)
    //const error = useSelector(getUsersErrors)
    
    useEffect(() => {
      if (userStatus === 'idle'){
        dispatch(fetchUsers())
      }
    }, [userStatus, dispatch])
    
    
    const handleDelete = id => {
      dispatch(deleteUser(id))
    }

    console.log(users)
    console.log(userStatus)

  return (
    <div className='w-15/1 bg-red-100'>
      <h1 className='rounded-md bg-black'>Cantidad de usuarios registrados al momento: {users.length}</h1>
        <div className='grid grid-cols-3 gap-5 self-center'>
          {users.map( user => (
              <div key={user.id} className='bg-neutral-800 p-1 rounded-md'>
                  <header className='rounded-sm place-self-center' >
                    <p>id: {user.id}</p>
                    <p>nombre: {user.Nombre}</p>
                    <p>apellido: {user.Apellido}</p>
                    <p>fecha de nacimiento: {user.Fechanacimiento}</p>
                    <p>documento:  {user.Dni}</p>
                    <p>edad: {user.Edad} años</p>
                    <p>email: {user.Email}</p>
                    <p>nacionalidad: {user.Nacionalidad}</p>
                    <div className='flex justify-between gap-x-5 p-7'>
                    <Link 
                        to={`/edit-user/${user.id}`} 
                        className='bg-indigo-600 px-2 py-1 rounded-sm text-xs self-center gap-3'> Edit
                      </Link>
                      <button 
                        onClick={()=> handleDelete(user.id)}
                        className = 'bg-red-500 px-2 py-1 text-xs rounded-md'
                      >Delete user</button>
                    </div>
                  </header>
              </div>
          ))}
        </div>
    </div>
  )
}

export default UsersList